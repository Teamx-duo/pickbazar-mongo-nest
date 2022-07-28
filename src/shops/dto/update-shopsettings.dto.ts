import { OmitType } from '@nestjs/swagger';
import { CreateShopSettingDto } from './create-shopsettings.dto';

export class UpdateShopSettingDto extends OmitType(CreateShopSettingDto, [
  'shop',
] as const) {}
