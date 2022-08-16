import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ReviewSchema = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: mongoose.Schema.Types.ObjectId;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  comment: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  photos: string[];

  @IsNumber()
  @ApiProperty()
  @Prop({ default: 0, min: 0 })
  positive_feedbacks_count: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ default: 0, min: 0, max: 5, required: true })
  rating: number;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: 0, min: 0 })
  negative_feedbacks_count: number;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: 0, min: 0 })
  abusive_reports_count: number;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  my_feedback: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.plugin(mongoosePaginate);
