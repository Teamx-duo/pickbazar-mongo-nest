import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';

export type GoogleSettingSchema = GoogleSetting & Document;

@Schema()
export class GoogleSetting {
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Prop()
  isEnable: boolean;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @Prop()
  tagManagerId: string;
}

export const GoogleSettingSchema = SchemaFactory.createForClass(GoogleSetting);
