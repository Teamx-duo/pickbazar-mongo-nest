import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import {
  SettingsOptions,
  SettingsOptionsSchema,
} from './settingOptions.schema';

export type SettingSchema = Setting & Document;

@Schema()
export class Setting {
  @IsOptional()
  @ApiProperty()
  @Prop({ type: SettingsOptionsSchema })
  options: SettingsOptions;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
