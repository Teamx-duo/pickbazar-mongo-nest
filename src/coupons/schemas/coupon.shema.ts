import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Order } from 'src/orders/schemas/order.schema';

export type CouponSchema = Coupon & Document;

@Schema()
export class Coupon {
  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orders: Order[];

  @Prop({ enum: ['fixed', 'percentage', 'free_shipping'], default: 'fixed' })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: Attachment;

  @Prop()
  is_valid: boolean;

  @Prop()
  amount: number;

  @Prop()
  active_from: string;

  @Prop()
  expire_at: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
