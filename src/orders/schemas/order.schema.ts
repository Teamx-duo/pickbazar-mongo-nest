import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import {
  UserAddress,
  UserAddressSchema,
} from 'src/addresses/schemas/userAddress.schema';
import { Coupon } from 'src/coupons/schemas/coupon.shema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { User } from 'src/users/schema/user.schema';
import { OrderStatus } from './orderStatus.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ProductPivot } from 'src/products/schemas/productPivot.schema';

export type OrderSchema = Order & Document;

export enum PaymentGatewayType {
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  PAYPAL = 'PAYPAL',
}

@Schema({ timestamps: true })
export class Order {
  @IsNumber()
  @Prop()
  tracking_number: number;

  @IsPhoneNumber(null, {
    message: 'Contact must a valid phone number (eg: +92XXXXXXXXXX)',
  })
  @ApiProperty({ minLength: 10, maxLength: 15 })
  @Prop({ required: true })
  customer_contact: string;

  @IsMongoId()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  customer: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  parent_order: this;

  @IsMongoId({ each: true })
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  children: this[];

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus' })
  status: OrderStatus;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  amount: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  sales_tax: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  total: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop({ default: 0 })
  paid_total: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  payment_id: string;

  @IsEnum(PaymentGatewayType)
  @ApiProperty({ enum: PaymentGatewayType, enumName: 'payment_gateway' })
  @Prop({
    enum: [
      PaymentGatewayType.CASH_ON_DELIVERY,
      PaymentGatewayType.PAYPAL,
      PaymentGatewayType.STRIPE,
    ],
  })
  payment_gateway: string;

  @IsMongoId()
  @ApiProperty()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  coupon: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: mongoose.Schema.Types.ObjectId;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Prop()
  discount?: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ default: 0 })
  delivery_fee: number;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  delivery_time: string;

  @IsMongoId({ each: true })
  @IsArray()
  @ApiProperty()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductPivot' }],
  })
  products: ProductPivot[];

  @IsOptional()
  @Type(() => UserAddress)
  @ValidateNested()
  @ApiProperty()
  @Prop({ type: UserAddressSchema })
  billing_address: UserAddress;

  @IsOptional()
  @Type(() => UserAddress)
  @ValidateNested()
  @ApiProperty()
  @Prop({ type: UserAddressSchema })
  shipping_address: UserAddress;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({ shop: 1, customer: 1, coupon: 1, tracking_number: 1 });

OrderSchema.plugin(mongoosePaginate);
