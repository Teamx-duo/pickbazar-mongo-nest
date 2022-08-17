import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductPivot } from 'src/products/schemas/productPivot.schema';
import { PaymentGatewayType, Order } from '../schemas/order.schema';

export class CreateOrderDto extends PickType(Order, [
  'billing_address',
  'children',
  'coupon',
  'customer_contact',
  'delivery_fee',
  'delivery_time',
  'discount',
  'paid_total',
  'parent_order',
  'payment_gateway',
  'status',
  'payment_gateway',
  'payment_id',
  'shipping_address',
  'shop',
]) {
  @IsMongoId()
  @IsOptional()
  customer: string;
  @IsArray()
  products: ProductPivot[];
}

export class UserAddressInput {
  @IsString()
  street_address: string;
  @IsString()
  country: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsString()
  zip: string;
  @IsMongoId()
  @IsOptional()
  _id: string;
}

export class ConnectProductOrderPivot {
  @IsMongoId()
  product_id: string;
  @IsMongoId()
  @IsOptional()
  variation_option_id?: string;
  @IsNumber()
  order_quantity: number;
  @IsNumber()
  unit_price: number;
  @IsNumber()
  subtotal: number;
}

export class CardInput {
  @IsString()
  number: string;
  @IsString()
  expiryMonth: string;
  @IsString()
  expiryYear: string;
  @IsString()
  cvv: string;
  @IsEmail()
  email?: string;
}
