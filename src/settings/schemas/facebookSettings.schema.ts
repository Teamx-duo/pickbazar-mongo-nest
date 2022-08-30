import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { SettingsOptions } from './settingOptions.schema';

export type FacebookSettingSchema = FacebookSetting & Document;

@Schema()
export class FacebookSetting {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Prop()
  isEnable: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  appId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  pageId: string;
}

export const FacebookSettingSchema =
  SchemaFactory.createForClass(FacebookSetting);
