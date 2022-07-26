import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TypeSetting } from './typeSetting.schema';
import { Banner } from './banner.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type TypeSchema = Type & Document;

@Schema()
export class Type {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Banner' }] })
  banners: Banner[];

  @Prop()
  promotional_sliders: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TypeSetting' })
  settings: TypeSetting;
}

export const TypeSchema = SchemaFactory.createForClass(Type);

TypeSchema.plugin(mongoosePaginate);
