import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIBAN, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Shop } from './shop.shema';

export type PaymentInfoSchema = PaymentInfo & Document;

@Schema()
export class PaymentInfo {
  @IsIBAN()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  account?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  name?: string;

  @IsEmail()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  email?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  bank?: string;
}

export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);
