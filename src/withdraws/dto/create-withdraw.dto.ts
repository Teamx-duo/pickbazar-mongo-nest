import { PickType } from '@nestjs/swagger';
import { Withdraw } from '../schemas/withdraw.schema';

export class CreateWithdrawDto extends PickType(Withdraw, [
  'amount',
  'note',
  'details',
  'payment_method',
  'shop',
]) {}
