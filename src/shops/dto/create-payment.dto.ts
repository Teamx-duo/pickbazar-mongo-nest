import { IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  account?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  bank?: string;

  @IsString()
  shop: string;
}
