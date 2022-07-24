import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';

export type SeoSettingSchema = SeoSetting & Document;

@Schema()
export class SeoSetting {
  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop()
  ogTitle: string;

  @Prop()
  ogDescription: string;

  @Prop()
  ogImage: Attachment;

  @Prop()
  twitterHandle: string;

  @Prop()
  twitterCardType: string;

  @Prop()
  metaTags: string;

  @Prop()
  canonicalUrl: string;
}

export const SeoSettingSchema = SchemaFactory.createForClass(SeoSetting);
