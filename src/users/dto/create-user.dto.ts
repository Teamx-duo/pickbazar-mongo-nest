import { PickType } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
  'address',
  'is_active',
  'profile',
  'roles',
  'shops',
  'email_verified',
  'shop',
  'managed_shop',
]) {}
