import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Shop } from 'src/shops/schemas/shop.shema';

export type WithdrawSchema = Withdraw & Document;

@Schema()
export class Withdraw {
  @Prop()
  amount: number;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop()
  payment_method: string;

  @Prop()
  details: string;

  @Prop()
  note: string;
}

export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);
