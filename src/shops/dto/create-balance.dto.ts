import { PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBalanceDto {
  @IsNumber()
  @IsOptional()
  admin_commission_rate?: number;
  @IsNumber()
  @IsOptional()
  total_earnings?: number;
  @IsNumber()
  @IsOptional()
  withdrawn_amount?: number;
  @IsString()
  shop: string;
  @IsNumber()
  @IsOptional()
  current_balance?: number;
}
