import { PickType } from '@nestjs/swagger';
import { Coupon } from '../schemas/coupon.shema';

export class CreateCouponDto extends PickType(Coupon, [
  'code',
  'type',
  'amount',
  'description',
  'image',
  'expire_at',
  'active_from',
  'is_valid',
]) {}
