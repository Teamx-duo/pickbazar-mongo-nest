import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController, StaffsController } from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop.shema';
import { PaymentInfo, PaymentInfoSchema } from './schemas/paymentInfo.schema';
import { Balance, BalanceSchema } from './schemas/balance.schema';
import {
  ShopSettings,
  ShopSettingsSchema,
} from './schemas/shopSettings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    MongooseModule.forFeature([
      { name: PaymentInfo.name, schema: PaymentInfoSchema },
    ]),
    MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }]),
    MongooseModule.forFeature([
      { name: ShopSettings.name, schema: ShopSettingsSchema },
    ]),
  ],
  controllers: [ShopsController, StaffsController],
  providers: [ShopsService],
})
export class ShopsModule {}
