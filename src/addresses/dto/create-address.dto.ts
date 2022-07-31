import { PickType } from '@nestjs/swagger';
import { Address } from '../schemas/address.schema';

export class CreateAddressDto extends PickType(Address, [
  'title',
  'type',
  'default',
  'address',
]) {
  'customer': string;
}
