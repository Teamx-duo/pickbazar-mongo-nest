import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type GoogleSettingSchema = GoogleSetting & Document;

@Schema()
export class GoogleSetting {
  @Prop()
  isEnable: boolean;

  @Prop()
  tagManagerId: string;
}

export const GoogleSettingSchema = SchemaFactory.createForClass(GoogleSetting);
