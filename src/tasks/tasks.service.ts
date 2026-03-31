import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepo.find({ order: { dueDate: 'ASC', createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create(dto);
    return this.taskRepo.save(task);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    const wasPending = task.status !== 'done';

    Object.assign(task, dto);
    const saved = await this.taskRepo.save(task);

    // When a repeatable task is marked done, auto-create the next instance
    if (dto.status === 'done' && wasPending && task.repeat !== 'none' && task.dueDate) {
      const nextDate = this.getNextDate(task.dueDate, task.repeat);
      if (nextDate) {
        await this.taskRepo.save(
          this.taskRepo.create({
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: 'pending',
            assignedTo: task.assignedTo,
            repeat: task.repeat,
            clientId: task.clientId,
            dueDate: nextDate,
          }),
        );
      }
    }

    return saved;
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepo.remove(task);
  }

  private getNextDate(dateStr: string, repeat: string): string | null {
    const date = new Date(dateStr);
    switch (repeat) {
      case 'daily':   date.setDate(date.getDate() + 1); break;
      case 'weekly':  date.setDate(date.getDate() + 7); break;
      case 'monthly': date.setMonth(date.getMonth() + 1); break;
      case 'yearly':  date.setFullYear(date.getFullYear() + 1); break;
      default: return null;
    }
    return date.toISOString().split('T')[0];
  }
}
