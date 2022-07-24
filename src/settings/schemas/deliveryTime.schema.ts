import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DeliveryTimeSchema = DeliveryTime & Document;

@Schema()
export class DeliveryTime {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const DeliveryTimeSchema = SchemaFactory.createForClass(DeliveryTime);
