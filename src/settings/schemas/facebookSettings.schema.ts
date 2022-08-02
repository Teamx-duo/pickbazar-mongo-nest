import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { SettingsOptions } from './settingOptions.schema';

export type FacebookSettingSchema = FacebookSetting & Document;

@Schema()
export class FacebookSetting {
  @IsBoolean()
  @ApiProperty()
  @Prop({ required: true })
  isEnable: boolean;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  appId: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  pageId: string;
}

export const FacebookSettingSchema =
  SchemaFactory.createForClass(FacebookSetting);
