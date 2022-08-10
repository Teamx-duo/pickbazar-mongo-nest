import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  @Prop()
  name: string;

  @IsNumber()
  @Prop()
  amount: string;

  @IsBoolean()
  @IsOptional()
  @Prop({ default: false })
  is_global: boolean = false;

  @IsEnum(ShippingType)
  @Prop({ enum: ShippingType })
  type: ShippingType = ShippingType.FIXED;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
ShippingSchema.plugin(mongoosePaginate);
