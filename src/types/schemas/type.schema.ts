import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TypeSetting } from './typeSetting.schema';
import { Banner } from './banner.schema';

export type TypeSchema = Type & Document;

@Schema()
export class Type {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  image: string;

  @Prop()
  icon: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Banner' }] })
  banners: Banner[];

  @Prop()
  promotional_sliders: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TypeSetting' })
  settings: TypeSetting;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
