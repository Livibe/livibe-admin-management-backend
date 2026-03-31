import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @IsString()
  @IsOptional()
  @IsIn(['pending', 'done', 'overdue'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsIn(['muan', 'japan', 'kla'])
  assignedTo?: string;

  @IsString()
  @IsOptional()
  @IsIn(['none', 'daily', 'weekly', 'monthly', 'yearly'])
  repeat?: string;

  @IsString()
  @IsOptional()
  clientId?: string;
}
