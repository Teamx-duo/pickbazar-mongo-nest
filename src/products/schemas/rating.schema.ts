import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import {
  VariationOption,
  VariationOptionSchema,
} from './variationOption.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type RatingSchema = Rating & Document;

@Schema({ timestamps: true })
export class Rating {
  @IsNumber()
  @ApiProperty({ minimum: 0, maximum: 5 })
  @Prop({ default: 0, min: 0, max: 5 })
  rating: number;

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

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  my_feedback: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.plugin(mongoosePaginate);

// export const VariationSchema = () => {
//   const schema = new mongoose.Schema({
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//     },
//     options: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'VariationOption',
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     price: { type: Number },
//     sku: { type: Number },
//     is_disable: { type: Number },
//     sale_price: { type: Number },
//     quantity: { type: Number },
//   });
//   return schema;
// };
