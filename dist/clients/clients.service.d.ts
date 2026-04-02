import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsService {
    private readonly clientRepo;
    constructor(clientRepo: Repository<Client>);
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    create(dto: CreateClientDto): Promise<Client>;
    update(id: string, dto: UpdateClientDto): Promise<Client>;
    remove(id: string): Promise<void>;
    upsertBySheetRowId(dto: CreateClientDto): Promise<Client>;
}
