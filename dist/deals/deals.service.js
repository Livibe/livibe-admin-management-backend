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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deal_entity_1 = require("./deal.entity");
const STAGE_PROBABILITIES = {
    lead_identified: 5,
    contacted: 15,
    meeting_scheduled: 25,
    proposal_in_negotiation: 50,
    close_won: 100,
    close_loss: 0,
};
let DealsService = class DealsService {
    constructor(dealRepo) {
        this.dealRepo = dealRepo;
    }
    findAll() {
        return this.dealRepo.find({ order: { order: { direction: 'ASC', nulls: 'LAST' }, createdAt: 'ASC' } });
    }
    async findOne(id) {
        const deal = await this.dealRepo.findOne({ where: { id } });
        if (!deal)
            throw new common_1.NotFoundException(`Deal ${id} not found`);
        return deal;
    }
    create(dto) {
        const deal = this.dealRepo.create({
            ...dto,
            probability: dto.probability ?? STAGE_PROBABILITIES[dto.stage] ?? 5,
        });
        return this.dealRepo.save(deal);
    }
    async update(id, dto) {
        const deal = await this.findOne(id);
        if (dto.stage && dto.probability === undefined) {
            dto.probability = STAGE_PROBABILITIES[dto.stage] ?? deal.probability;
        }
        Object.assign(deal, dto);
        return this.dealRepo.save(deal);
    }
    async remove(id) {
        const deal = await this.findOne(id);
        await this.dealRepo.remove(deal);
    }
    async renameClient(clientSheetRowId, clientName) {
        await this.dealRepo.update({ clientSheetRowId }, { clientName });
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deal_entity_1.Deal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DealsService);
//# sourceMappingURL=deals.service.js.map