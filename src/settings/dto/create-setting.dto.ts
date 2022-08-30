import { PickType } from '@nestjs/swagger';
import { Setting } from '../schemas/setting.schema';

export class CreateSettingDto extends PickType(Setting, ['options']) {}
