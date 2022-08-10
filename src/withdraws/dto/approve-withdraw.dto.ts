import { PickType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Withdraw } from '../schemas/withdraw.schema';

export class ApproveWithdrawDto extends PickType(Withdraw, ['status']) {
  @IsMongoId()
  id: string;
}
