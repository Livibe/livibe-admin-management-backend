import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly taskRepo;
    constructor(taskRepo: Repository<Task>);
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task>;
    create(dto: CreateTaskDto): Promise<Task>;
    update(id: string, dto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<void>;
    private getNextDate;
}
