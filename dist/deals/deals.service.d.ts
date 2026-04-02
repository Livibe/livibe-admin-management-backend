import { Repository } from 'typeorm';
import { Deal } from './deal.entity';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
export declare class DealsService {
    private readonly dealRepo;
    constructor(dealRepo: Repository<Deal>);
    findAll(): Promise<Deal[]>;
    findOne(id: string): Promise<Deal>;
    create(dto: CreateDealDto): Promise<Deal>;
    update(id: string, dto: UpdateDealDto): Promise<Deal>;
    remove(id: string): Promise<void>;
    renameClient(clientSheetRowId: string, clientName: string): Promise<void>;
}
