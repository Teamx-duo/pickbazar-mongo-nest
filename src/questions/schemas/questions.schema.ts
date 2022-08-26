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
import { UserFeedback, UserFeedbackSchema } from './user-feedback.schema';

export type QuestionSchema = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @IsMongoId()
  @ApiProperty()
  @IsOptional()
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
  question: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @Prop()
  answer: string;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ default: 0, min: 0 })
  positive_feedbacks_count: number;

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
  @IsOptional()
  @Prop({ type: [UserFeedbackSchema] })
  feedbacks: UserFeedback[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.plugin(mongoosePaginate);
