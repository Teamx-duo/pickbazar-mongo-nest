import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OrderStatusSchema = OrderStatus & Document;

@Schema()
export class OrderStatus {
  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop()
  serial: number;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
