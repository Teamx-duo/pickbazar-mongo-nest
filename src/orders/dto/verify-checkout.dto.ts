import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ConnectProductOrderPivot, UserAddressInput } from './create-order.dto';

export class CheckoutVerificationDto {
  @IsNumber()
  amount: number;
  @ValidateNested({ each: true })
  @Type(() => ConnectProductOrderPivot)
  products: ConnectProductOrderPivot[];
  @IsOptional()
  billing_address?: UserAddressInput;
  @IsOptional()
  shipping_address?: UserAddressInput;
}

export class VerifiedCheckoutData {
  @IsNumber()
  total_tax: number;
  @IsNumber()
  shipping_charge: number;
  @IsArray()
  unavailable_products: string[];
}
