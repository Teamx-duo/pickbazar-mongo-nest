import { OmitType } from '@nestjs/swagger';
import { CreateBalanceDto } from './create-balance.dto';

export class UpdateBalanceDto extends OmitType(CreateBalanceDto, [
  'shop',
] as const) {}
