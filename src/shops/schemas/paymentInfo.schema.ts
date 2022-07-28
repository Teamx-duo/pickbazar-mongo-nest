import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Shop } from './shop.shema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;
}

export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);
