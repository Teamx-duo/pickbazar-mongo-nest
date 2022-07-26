import { PickType } from '@nestjs/swagger';
import { Profile } from '../entities/profile.entity';

export class CreateProfileDto extends PickType(Profile, [
  'avatar',
  'bio',
  'socials',
  'contact',
]) {
  customer: string;
}

export class ConnectBelongsTo {
  connect: number;
}
