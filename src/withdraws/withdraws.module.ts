import { Module } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { WithdrawsController } from './withdraws.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Withdraw, WithdrawSchema } from './schemas/withdraw.schema';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Withdraw.name, schema: WithdrawSchema },
    ]),
    ShopsModule,
  ],
  controllers: [WithdrawsController],
  providers: [WithdrawsService],
  exports: [MongooseModule, WithdrawsService],
})
export class WithdrawsModule {}
