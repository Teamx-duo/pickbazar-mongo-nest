import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type GoogleSettingSchema = GoogleSetting & Document;

@Schema()
export class GoogleSetting {
  @IsBoolean()
  @ApiProperty()
  @Prop({ required: true })
  isEnable: boolean;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  tagManagerId: string;
}

export const GoogleSettingSchema = SchemaFactory.createForClass(GoogleSetting);
