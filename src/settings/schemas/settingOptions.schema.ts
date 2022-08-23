import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Shipping } from 'src/shippings/entities/shipping.entity';
import { Tax } from 'src/taxes/schemas/taxes.schema';
import { ContactDetail, ContactDetailSchema } from './contactDetails.schema';
import { DeliveryTime, DeliveryTimeSchema } from './deliveryTime.schema';
import {
  FacebookSetting,
  FacebookSettingSchema,
} from './facebookSettings.schema';
import { GoogleSetting, GoogleSettingSchema } from './googleSettings.schema';
import { SeoSetting, SeoSettingSchema } from './seoSettings.schema';

export type SettingsOptionsSchema = SettingsOptions & Document;

@Schema()
export class SettingsOptions {
  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  siteTitle: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  siteSubtitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop({ default: 'USD' })
  currency?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Prop({ default: 10 })
  minimumOrderAmount: number;

  @IsOptional()
  @ApiProperty()
  @Prop({ type: [DeliveryTimeSchema] })
  deliveryTime: DeliveryTime[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  logo: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tax' })
  taxClass: Tax;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipping' })
  shippingClass: Shipping;

  @IsOptional()
  @ApiProperty()
  @Prop({ type: SeoSettingSchema })
  seo?: SeoSetting;

  @IsOptional()
  @ApiProperty()
  @Prop({ type: GoogleSettingSchema })
  google?: GoogleSetting;

  @IsOptional()
  @ApiProperty()
  @Prop({ type: FacebookSettingSchema })
  facebook?: FacebookSetting;

  @IsOptional()
  @ApiProperty()
  @Prop({ type: ContactDetailSchema })
  contactDetails?: ContactDetail;
}

export const SettingsOptionsSchema =
  SchemaFactory.createForClass(SettingsOptions);
