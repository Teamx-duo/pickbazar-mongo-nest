import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
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
  @IsOptional()
  @ApiProperty()
  @MaxLength(100)
  @Prop()
  siteTitle: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @MaxLength(160)
  @Prop()
  siteSubtitle: string;

  @IsString()
  @IsOptional()
  @MaxLength(5)
  @ApiPropertyOptional()
  @Prop({ default: 'USD' })
  currency?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop({ default: 10 })
  minimumOrderAmount: number;

  @IsOptional()
  @Type(() => DeliveryTime)
  @IsArray()
  @ValidateNested({ each: true })
  @ApiPropertyOptional()
  @Prop({ type: [DeliveryTimeSchema] })
  deliveryTime: DeliveryTime[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  logo: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tax' })
  taxClass: Tax;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shipping' })
  shippingClass: Shipping;

  @IsOptional()
  @Type(() => SeoSetting)
  @ValidateNested()
  @ApiPropertyOptional()
  @Prop({ type: SeoSettingSchema })
  seo?: SeoSetting;

  @IsOptional()
  @Type(() => GoogleSetting)
  @IsDefined()
  @ValidateNested()
  @ApiPropertyOptional()
  @Prop({ type: GoogleSettingSchema })
  google?: GoogleSetting;

  @IsOptional()
  @Type(() => FacebookSetting)
  @ValidateNested()
  @ApiPropertyOptional()
  @Prop({ type: FacebookSettingSchema })
  facebook?: FacebookSetting;

  @IsOptional()
  @Type(() => ContactDetail)
  @ValidateNested()
  @ApiPropertyOptional()
  @Prop({ type: ContactDetailSchema })
  contactDetails?: ContactDetail;
}

export const SettingsOptionsSchema =
  SchemaFactory.createForClass(SettingsOptions);
