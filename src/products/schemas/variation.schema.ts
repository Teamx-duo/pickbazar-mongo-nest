import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { VariationOption } from './variationOption.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type VariationSchema = Variation & Document;

@Schema({ timestamps: true })
export class Variation {
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  sku: string;

  @Prop()
  is_disable: boolean;

  @Prop()
  sale_price: number;

  @Prop()
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VariationOption' }],
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
