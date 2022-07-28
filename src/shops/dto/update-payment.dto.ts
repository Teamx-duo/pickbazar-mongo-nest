import { OmitType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends OmitType(CreatePaymentDto, [
  'shop',
] as const) {}
