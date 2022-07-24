import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { DeliveryTime } from './deliveryTime.schema';
import { FacebookSetting } from './facebookSettings.schema';
import { GoogleSetting } from './googleSettings.schema';
import { SeoSetting } from './seoSettings.schema';

export type SettingOptionSchema = SettingOption & Document;

@Schema()
export class SettingOption {
  @Prop()
  siteTitle: string;

  @Prop()
  siteSubtitle: string;

  @Prop()
  currency: string;

  @Prop()
  minimumOrderAmount: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryTime' }],
  })
  deliveryTime: DeliveryTime[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  logo: Attachment;

  @Prop()
  taxClass: string;

  @Prop()
  shippingClass: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SeoSetting' })
  seo: SeoSetting;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GoogleSetting' })
  google: GoogleSetting;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FacebookSetting' })
  facebook: FacebookSetting;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ContactDetail' })
  contactDetails: SettingOption;
}

export const SettingOptionSchema = SchemaFactory.createForClass(SettingOption);
