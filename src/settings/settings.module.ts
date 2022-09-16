import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ContactDetail,
  ContactDetailSchema,
} from './schemas/contactDetails.schema';
import {
  DeliveryTime,
  DeliveryTimeSchema,
} from './schemas/deliveryTime.schema';
import {
  FacebookSetting,
  FacebookSettingSchema,
} from './schemas/facebookSettings.schema';
import {
  GoogleSetting,
  GoogleSettingSchema,
} from './schemas/googleSettings.schema';
import { Location, LocationSchema } from './schemas/location.schema';
import { SeoSetting, SeoSettingSchema } from './schemas/seoSettings.schema';
import {
  SettingsOptions,
  SettingsOptionsSchema,
} from './schemas/settingOptions.schema';
import { ShopSocials, ShopSocialsSchema } from './schemas/shopSocials.schema';
import { Setting, SettingSchema } from './schemas/setting.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactDetail.name, schema: ContactDetailSchema },
      { name: ShopSocials.name, schema: ShopSocialsSchema },
      { name: SettingsOptions.name, schema: SettingsOptionsSchema },
      { name: Setting.name, schema: SettingSchema },
      { name: DeliveryTime.name, schema: DeliveryTimeSchema },
      { name: FacebookSetting.name, schema: FacebookSettingSchema },
      { name: GoogleSetting.name, schema: GoogleSettingSchema },
      { name: Location.name, schema: LocationSchema },
      { name: SeoSetting.name, schema: SeoSettingSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService, MongooseModule],
})
export class SettingsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SettingsController);
  }
}
