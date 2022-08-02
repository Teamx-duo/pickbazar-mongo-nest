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
import { ContactDetail } from './contactDetails.schema';
import { DeliveryTime } from './deliveryTime.schema';
import { FacebookSetting } from './facebookSettings.schema';
import { GoogleSetting } from './googleSettings.schema';
import { SeoSetting } from './seoSettings.schema';

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeliveryTime)
  @IsOptional()
  @ApiProperty()
  @Prop()
  deliveryTime: DeliveryTime[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  logo: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  taxClass: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  shippingClass: string;

  @ValidateNested()
  @Type(() => GoogleSetting)
  @IsOptional()
  @ApiProperty()
  @Prop()
  google?: GoogleSetting;

  @ValidateNested()
  @Type(() => FacebookSetting)
  @IsOptional()
  @ApiProperty()
  @Prop()
  facebook?: FacebookSetting;

  @ValidateNested()
  @Type(() => ContactDetail)
  @IsOptional()
  @ApiProperty()
  @Prop()
  contactDetails?: ContactDetail;
}

export const SettingsOptionsSchema =
  SchemaFactory.createForClass(SettingsOptions);
