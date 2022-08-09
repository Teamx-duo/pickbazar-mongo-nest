import { IsString } from 'class-validator';
import { Coupon } from '../entities/coupon.entity';

export class VerifyCouponInput {
  @IsString()
  code: string;
}
export class VerifyCouponResponse {
  is_valid: boolean;
  coupon: Coupon;
}
