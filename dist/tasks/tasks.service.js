"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
let TasksService = class TasksService {
    constructor(taskRepo) {
        this.taskRepo = taskRepo;
    }
    findAll() {
        return this.taskRepo.find({ order: { dueDate: 'ASC', createdAt: 'DESC' } });
    }
    async findOne(id) {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task)
            throw new common_1.NotFoundException(`Task ${id} not found`);
        return task;
    }
    create(dto) {
        const task = this.taskRepo.create(dto);
        return this.taskRepo.save(task);
    }
    async update(id, dto) {
        const task = await this.findOne(id);
        const wasPending = task.status !== 'done';
        Object.assign(task, dto);
        const saved = await this.taskRepo.save(task);
        if (dto.status === 'done' && wasPending && task.repeat !== 'none' && task.dueDate) {
            const nextDate = this.getNextDate(task.dueDate, task.repeat);
            if (nextDate) {
                await this.taskRepo.save(this.taskRepo.create({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    status: 'pending',
                    assignedTo: task.assignedTo,
                    repeat: task.repeat,
                    clientId: task.clientId,
                    dueDate: nextDate,
                }));
            }
        }
        return saved;
    }
    async remove(id) {
        const task = await this.findOne(id);
        await this.taskRepo.remove(task);
    }
    getNextDate(dateStr, repeat) {
        const date = new Date(dateStr);
        switch (repeat) {
            case 'daily':
                date.setDate(date.getDate() + 1);
                break;
            case 'weekly':
                date.setDate(date.getDate() + 7);
                break;
            case 'monthly':
                date.setMonth(date.getMonth() + 1);
                break;
            case 'yearly':
                date.setFullYear(date.getFullYear() + 1);
                break;
            default: return null;
        }
        return date.toISOString().split('T')[0];
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map