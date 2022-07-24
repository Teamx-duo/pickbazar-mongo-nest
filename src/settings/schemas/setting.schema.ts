import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SettingOption } from './settingsOption.schema';

export type SettingSchema = Setting & Document;

@Schema()
export class Setting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SettingOption' })
  options: SettingOption;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
