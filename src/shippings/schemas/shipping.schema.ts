import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ShippingSchema = Shipping & Document;

@Schema()
export class Shipping {
  @Prop()
  name: string;

  @Prop()
  amount: string;

  @Prop()
  is_global: number;

  @Prop({ enum: ['percentage', 'fixed', 'free'] })
  type: string;
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
