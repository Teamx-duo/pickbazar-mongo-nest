import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PaymentInfoSchema = PaymentInfo & Document;

@Schema()
export class PaymentInfo {
  @Prop()
  account: string;

  @Prop()
  name: boolean;

  @Prop()
  email: string;

  @Prop()
  bank: string;
}

export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);
