import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Document } from 'mongoose';
import { SettingsOptions } from './settingOptions.schema';

export type SettingSchema = Setting & Document;

@Schema()
export class Setting {
  @ValidateNested({ each: true })
  @Type(() => SettingsOptions)
  @ApiProperty()
  @Prop({ required: true })
  options: SettingsOptions;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
