import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type DeliveryTimeSchema = DeliveryTime & Document;

@Schema()
export class DeliveryTime {
  @IsString()
  @IsOptional()
  @Prop()
  title: string;

  @IsString()
  @IsOptional()
  @Prop()
  description: string;
}

export const DeliveryTimeSchema = SchemaFactory.createForClass(DeliveryTime);
