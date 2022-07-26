import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { UserFeedback, UserFeedbackSchema } from './user-feedback.schema';

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
  @MinLength(10)
  @MaxLength(100)
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
  @Max(5)
  @Min(0)
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

  @ApiPropertyOptional()
  @Type(() => UserFeedback)
  @ValidateNested({ each: true })
  @IsOptional()
  @Prop({ type: [UserFeedbackSchema] })
  feedbacks: UserFeedback[];
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.index({ comment: 'text' });
ReviewSchema.index({ rating: 1 });

ReviewSchema.plugin(mongoosePaginate);
