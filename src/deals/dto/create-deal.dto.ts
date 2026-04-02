import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn, Min } from 'class-validator';

const VALID_STAGES = [
  'lead_identified',
  'contacted',
  'meeting_scheduled',
  'proposal_in_negotiation',
  'close_won',
  'close_loss',
];

export class CreateDealDto {
  @IsString()
  @IsOptional()
  eventName?: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  dealValue?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsIn(VALID_STAGES)
  stage: string;

  @IsNumber()
  @IsOptional()
  probability?: number;

  @IsString()
  @IsOptional()
  approachEndDate?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  @IsIn(['muan', 'japan', 'kla'])
  createdBy?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsOptional()
  clientSheetRowId?: string;
}
