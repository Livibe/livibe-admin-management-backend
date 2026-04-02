import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

const STAGE_PROBABILITIES: Record<string, number> = {
  lead_identified: 5,
  contacted: 15,
  meeting_scheduled: 25,
  proposal_in_negotiation: 50,
  close_won: 100,
  close_loss: 0,
};

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepo: Repository<Deal>,
  ) {}

  findAll(): Promise<Deal[]> {
    return this.dealRepo.find({ order: { order: { direction: 'ASC', nulls: 'LAST' }, createdAt: 'ASC' } });
  }

  async findOne(id: string): Promise<Deal> {
    const deal = await this.dealRepo.findOne({ where: { id } });
    if (!deal) throw new NotFoundException(`Deal ${id} not found`);
    return deal;
  }

  create(dto: CreateDealDto): Promise<Deal> {
    const deal = this.dealRepo.create({
      ...dto,
      probability: dto.probability ?? STAGE_PROBABILITIES[dto.stage] ?? 5,
    });
    return this.dealRepo.save(deal);
  }

  async update(id: string, dto: UpdateDealDto): Promise<Deal> {
    const deal = await this.findOne(id);
    if (dto.stage && dto.probability === undefined) {
      dto.probability = STAGE_PROBABILITIES[dto.stage] ?? deal.probability;
    }
    Object.assign(deal, dto);
    return this.dealRepo.save(deal);
  }

  async remove(id: string): Promise<void> {
    const deal = await this.findOne(id);
    await this.dealRepo.remove(deal);
  }

  // Update clientName on all deals matching a sheetRowId (handles company renames)
  async renameClient(clientSheetRowId: string, clientName: string): Promise<void> {
    await this.dealRepo.update({ clientSheetRowId }, { clientName });
  }
}
