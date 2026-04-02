import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  create(dto: CreateClientDto): Promise<Client> {
    const client = this.clientRepo.create(dto);
    return this.clientRepo.save(client);
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.clientRepo.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepo.remove(client);
  }

  // Upsert by sheetRowId — create if new, update if exists (name changes are handled)
  async upsertBySheetRowId(dto: CreateClientDto): Promise<Client> {
    if (!dto.sheetRowId) return this.create(dto);
    const existing = await this.clientRepo.findOne({ where: { sheetRowId: dto.sheetRowId } });
    if (existing) {
      Object.assign(existing, dto);
      return this.clientRepo.save(existing);
    }
    return this.create(dto);
  }
}
