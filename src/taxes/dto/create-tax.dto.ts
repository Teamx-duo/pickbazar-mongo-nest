import { OmitType, PickType } from '@nestjs/swagger';
import { Tax } from '../schemas/taxes.schema';

export class CreateTaxDto extends PickType(Tax, [
  'city',
  'country',
  'is_global',
  'name',
  'on_shipping',
  'priority',
  'rate',
  'state',
  'zip',
]) {}
