import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { PaymentInfo, PaymentInfoSchema } from './paymentInfo.schema';
import { Shop } from './shop.shema';

export type BalanceSchema = Balance & Document;

@Schema()
export class Balance {
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ min: 0 })
  admin_commission_rate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: 0 })
  total_earnings?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: 0 })
  withdrawn_amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: 0 })
  current_balance?: number;

  @ValidateNested()
  @Type(() => PaymentInfo)
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ type: PaymentInfoSchema })
  payment_info?: PaymentInfo;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
