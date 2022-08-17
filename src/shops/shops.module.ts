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
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Profile, ProfileSchema } from 'src/users/schema/profile.schema';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: PaymentInfo.name, schema: PaymentInfoSchema },
      { name: Balance.name, schema: BalanceSchema },
      { name: ShopSettings.name, schema: ShopSettingsSchema },
    ]),
    UsersModule,
    MailModule,
  ],
  controllers: [ShopsController, StaffsController],
  providers: [ShopsService, UsersService],
  exports: [ShopsService, MongooseModule],
})
export class ShopsModule {}
