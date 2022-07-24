import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './schemas/setting.schema';
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
  SettingOption,
  SettingOptionSchema,
} from './schemas/settingsOption.schema';
import { ShopSocials, ShopSocialsSchema } from './schemas/shopSocials.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
    MongooseModule.forFeature([
      { name: ContactDetail.name, schema: ContactDetailSchema },
    ]),
    MongooseModule.forFeature([
      { name: DeliveryTime.name, schema: DeliveryTimeSchema },
    ]),
    MongooseModule.forFeature([
      { name: FacebookSetting.name, schema: FacebookSettingSchema },
    ]),
    MongooseModule.forFeature([
      { name: GoogleSetting.name, schema: GoogleSettingSchema },
    ]),
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
    ]),
    MongooseModule.forFeature([
      { name: SeoSetting.name, schema: SeoSettingSchema },
    ]),
    MongooseModule.forFeature([
      { name: SettingOption.name, schema: SettingOptionSchema },
    ]),
    MongooseModule.forFeature([
      { name: ShopSocials.name, schema: ShopSocialsSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
