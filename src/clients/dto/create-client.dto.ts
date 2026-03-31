import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  // Free-form industry (Music Event, EDM Festival, etc.)
  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  website?: string;

  // approached | connected | interesting | not_interested
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  // Contact 1
  @IsString()
  @IsOptional()
  contact1Name?: string;

  @IsString()
  @IsOptional()
  contact1Phone?: string;

  @IsString()
  @IsOptional()
  contact1Email?: string;

  // Contact 2
  @IsString()
  @IsOptional()
  contact2Name?: string;

  @IsString()
  @IsOptional()
  contact2Phone?: string;

  @IsString()
  @IsOptional()
  contact2Email?: string;

  // Personal Gmail of contact person
  @IsString()
  @IsOptional()
  contactPersonGmail?: string;

  // muan | japan | kla
  @IsString()
  @IsOptional()
  whoApproach?: string;
}
