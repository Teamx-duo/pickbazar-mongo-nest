import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from './type.schema';

export type BannerSchema = Banner & Document;

@Schema()
export class Banner {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
