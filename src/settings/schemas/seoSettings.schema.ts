import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Setting } from './setting.schema';

export type SeoSettingSchema = SeoSetting & Document;

@Schema()
export class SeoSetting {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  metaDescription?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  ogTitle?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  ogDescription?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  ogImage?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  twitterHandle?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  twitterCardType?: string;

  @IsString()
  @ApiProperty()
  @Prop()
  metaTags?: string;

  @IsString()
  @ApiProperty()
  @Prop()
  canonicalUrl?: string;
}

export const SeoSettingSchema = SchemaFactory.createForClass(SeoSetting);
