import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BannerSchema = Banner & Document;

@Schema()
export class Banner {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
