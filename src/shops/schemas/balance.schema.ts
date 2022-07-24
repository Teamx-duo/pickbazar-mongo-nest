import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PaymentInfo } from './paymentInfo.schema';
import { Shop } from './shop.shema';

export type BalanceSchema = Balance & Document;

@Schema()
export class Balance {
  @Prop()
  id: string;

  @Prop()
  admin_commission_rate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop()
  total_earnings: string;

  @Prop()
  withdrawn_amount: string;

  @Prop()
  current_balance: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentInfo' })
  payment_info: PaymentInfo;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
