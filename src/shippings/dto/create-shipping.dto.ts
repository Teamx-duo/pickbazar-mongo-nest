import { PickType } from '@nestjs/swagger';
import { Shipping } from '../schemas/shipping.schema';

export class CreateShippingDto extends PickType(Shipping, [
  'name',
  'amount',
  'is_global',
  'type',
]) {}
