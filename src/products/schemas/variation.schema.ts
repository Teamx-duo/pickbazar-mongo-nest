import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import {
  VariationOption,
  VariationOptionSchema,
} from './variationOption.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export type VariationSchema = Variation & Document;

@Schema({ timestamps: true })
export class Variation {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @Prop({ required: true })
  title: string;

  @IsNumber()
  @Prop({ required: true })
  price: number;

  @IsString()
  @IsOptional()
  @Prop()
  sku: string;

  @IsBoolean()
  @IsOptional()
  @Prop({ default: false })
  is_disable: boolean;

  @IsNumber()
  @IsOptional()
  @Prop()
  sale_price: number;

  @IsNumber()
  @Prop({ required: true })
  quantity: number;

  @IsOptional()
  @Prop({
    type: [VariationOptionSchema],
  })
  options: VariationOption[];
}

export const VariationSchema = SchemaFactory.createForClass(Variation);

VariationSchema.plugin(mongoosePaginate);

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
