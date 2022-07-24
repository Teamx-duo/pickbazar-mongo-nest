import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type FacebookSettingSchema = FacebookSetting & Document;

@Schema()
export class FacebookSetting {
  @Prop()
  isEnable: boolean;

  @Prop()
  appId: string;

  @Prop()
  pageId: string;
}

export const FacebookSettingSchema =
  SchemaFactory.createForClass(FacebookSetting);
