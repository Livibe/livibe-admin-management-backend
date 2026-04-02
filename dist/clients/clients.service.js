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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./client.entity");
let ClientsService = class ClientsService {
    constructor(clientRepo) {
        this.clientRepo = clientRepo;
    }
    findAll() {
        return this.clientRepo.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const client = await this.clientRepo.findOne({ where: { id } });
        if (!client)
            throw new common_1.NotFoundException(`Client ${id} not found`);
        return client;
    }
    create(dto) {
        const client = this.clientRepo.create(dto);
        return this.clientRepo.save(client);
    }
    async update(id, dto) {
        const client = await this.findOne(id);
        Object.assign(client, dto);
        return this.clientRepo.save(client);
    }
    async remove(id) {
        const client = await this.findOne(id);
        await this.clientRepo.remove(client);
    }
    async upsertBySheetRowId(dto) {
        if (!dto.sheetRowId)
            return this.create(dto);
        const existing = await this.clientRepo.findOne({ where: { sheetRowId: dto.sheetRowId } });
        if (existing) {
            Object.assign(existing, dto);
            return this.clientRepo.save(existing);
        }
        return this.create(dto);
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map