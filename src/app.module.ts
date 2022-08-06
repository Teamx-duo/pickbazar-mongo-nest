import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AttributesModule } from './attributes/attributes.module';
import { ShippingsModule } from './shippings/shippings.module';
import { TaxesModule } from './taxes/taxes.module';
import { TagsModule } from './tags/tags.module';
import { ShopsModule } from './shops/shops.module';
import { TypesModule } from './types/types.module';
import { WithdrawsModule } from './withdraws/withdraws.module';
import { UploadsModule } from './uploads/uploads.module';
import { SettingsModule } from './settings/settings.module';
import { CouponsModule } from './coupons/coupons.module';
import { AddressesModule } from './addresses/addresses.module';
import { ImportsModule } from './imports/imports.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration, { ConfigType } from './configuration/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<ConfigType['db']>('db');

        const userString =
          config.user && config.pass
            ? config.user + ':' + config.pass + '@'
            : '';

        const authSource = config.authSource
          ? '?authSource=' + config.authSource + '&w=1'
          : '';

        return {
          uri:
            'mongodb://' +
            userString +
            config.host +
            ':' +
            config.port +
            '/' +
            config.database +
            authSource,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    CommonModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    AnalyticsModule,
    AttributesModule,
    ShippingsModule,
    TaxesModule,
    TagsModule,
    ShopsModule,
    TypesModule,
    WithdrawsModule,
    UploadsModule,
    SettingsModule,
    CouponsModule,
    AddressesModule,
    ImportsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
