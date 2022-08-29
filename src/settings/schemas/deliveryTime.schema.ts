import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type DeliveryTimeSchema = DeliveryTime & Document;

@Schema()
export class DeliveryTime {
  @IsString()
  @MaxLength(150)
  @IsOptional()
  @Prop()
  title: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  @Prop()
  description: string;
}

export const DeliveryTimeSchema = SchemaFactory.createForClass(DeliveryTime);
