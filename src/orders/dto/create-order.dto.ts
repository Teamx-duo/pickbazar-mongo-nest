import { PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsString,
} from 'class-validator';
import { PaymentGatewayType, Order } from '../schemas/order.schema';

export class CreateOrderDto extends PickType(Order, [
  'billing_address',
  'children',
  'coupon',
  'customer',
  'customer_contact',
  'delivery_fee',
  'delivery_time',
  'discount',
  'paid_total',
  'parent_order',
  'payment_gateway',
  'payment_gateway',
  'payment_id',
  'shipping_address',
  'shop',
  'status',
]) {
  @IsArray()
  products: string[];
}

export class UserAddressInput {
  street_address: string;
  country: string;
  city: string;
  state: string;
  zip: string;
}

export class ConnectProductOrderPivot {
  @IsMongoId()
  product_id: string;
  @IsMongoId()
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
