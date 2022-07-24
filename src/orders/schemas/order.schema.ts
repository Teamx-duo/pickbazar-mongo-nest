import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserAddress } from 'src/addresses/schemas/userAddress.schema';
import { Coupon } from 'src/coupons/schemas/coupon.shema';
import { Product } from 'src/products/schemas/product.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { User } from 'src/users/schema/user.schema';
import { OrderStatus } from './orderStatus.schema';

export type OrderSchema = Order & Document;

@Schema()
export class Order {
  @Prop()
  tracking_number: string;

  @Prop()
  customer_id: number;

  @Prop()
  customer_contact: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  parent_order: this;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  children: this[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' })
  status: OrderStatus;

  @Prop()
  amount: number;

  @Prop()
  sales_tax: number;

  @Prop()
  total: number;

  @Prop()
  paid_total: number;

  @Prop()
  payment_id: string;

  @Prop({ enum: ['cod', 'stripe', 'paypal'] })
  payment_gateway: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  coupon: Coupon;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop()
  discount: number;

  @Prop()
  delivery_fee: number;

  @Prop()
  delivery_time: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  billing_address: UserAddress;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  shipping_address: UserAddress;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
