import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsString, ValidateNested } from 'class-validator';
import { User } from 'src/users/schema/user.schema';
import { Address, AddressType } from '../schemas/address.schema';
import { UserAddress } from '../schemas/userAddress.schema';

export class CreateAddressDto extends PickType(Address, [
  'type',
  'default',
  'title',
  'address',
]) {
  @IsMongoId()
  customer: string;
}
