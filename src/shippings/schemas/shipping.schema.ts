import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ShippingSchema = Shipping & Document;

export enum ShippingType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE = 'free',
}

@Schema({ timestamps: true })
export class Shipping {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty()
  @Prop()
  name: string;

  @IsNumber()
  @ApiProperty()
  @Prop()
  amount: number;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  @Prop({ default: false })
  is_global: boolean;

  @IsEnum(ShippingType)
  @ApiPropertyOptional({ enum: ShippingType })
  @Prop({ enum: ShippingType })
  type: ShippingType = ShippingType.FIXED;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
ShippingSchema.plugin(mongoosePaginate);
