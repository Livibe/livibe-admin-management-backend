import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    findAll(): Promise<import("./deal.entity").Deal[]>;
    findOne(id: string): Promise<import("./deal.entity").Deal>;
    create(dto: CreateDealDto): Promise<import("./deal.entity").Deal>;
    update(id: string, dto: UpdateDealDto): Promise<import("./deal.entity").Deal>;
    renameClient(sheetRowId: string, clientName: string): Promise<void>;
    remove(id: string): Promise<void>;
}
