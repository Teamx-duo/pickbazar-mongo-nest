import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';
import { Variation } from './variation.schema';

export type VariationOptionSchema = VariationOption & Document;

@Schema({ timestamps: true })
export class VariationOption {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop({
    required: true,
  })
  value: string;
}

export const VariationOptionSchema =
  SchemaFactory.createForClass(VariationOption);
