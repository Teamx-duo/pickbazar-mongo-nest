import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Type } from './type.schema';

export type BannerSchema = Banner & Document;

@Schema()
export class Banner {
  @ApiPropertyOptional()
  @IsMongoId()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @IsString()
  @Prop({ required: true })
  image: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
