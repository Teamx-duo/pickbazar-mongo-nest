import { PickType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { User } from '../schema/user.schema';
import { CreateProfileDto } from './create-profile.dto';

enum Permission {
  SUPER_ADMIN = 'Super admin',
  STORE_OWNER = 'Store owner',
  STAFF = 'Staff',
  CUSTOMER = 'Customer',
}
export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
  'address',
  'is_active',
  'profile',
  'roles',
  'shops',
  'shop',
  'managed_shop',
]) {}
