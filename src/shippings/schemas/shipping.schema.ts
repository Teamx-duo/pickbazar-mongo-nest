import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ShippingSchema = Shipping & Document;

export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE = 'free',
}

@Schema()
export class Shipping {
  @IsString()
  @ApiProperty()
  @Prop()
  name: string;

  @IsNumber()
  @ApiProperty()
  @Prop()
  amount: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  @Prop({ default: false })
  is_global: boolean = false;

  @IsEnum(ShippingType)
  @ApiPropertyOptional({ enum: ShippingType })
  @Prop({ enum: ShippingType })
  type: ShippingType = ShippingType.FIXED;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
ShippingSchema.plugin(mongoosePaginate);
