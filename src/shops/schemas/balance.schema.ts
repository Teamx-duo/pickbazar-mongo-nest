import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PaymentInfo } from './paymentInfo.schema';
import { Shop } from './shop.shema';

export type BalanceSchema = Balance & Document;

@Schema()
export class Balance {
  @Prop({ required: true, min: 0 })
  admin_commission_rate: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @Prop({ default: 0 })
  total_earnings: number;

  @Prop({ default: 0 })
  withdrawn_amount: number;

  @Prop({ default: 0 })
  current_balance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentInfo' })
  payment_info: PaymentInfo;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
