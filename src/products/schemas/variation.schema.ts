import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Order } from 'src/orders/schemas/order.schema';
import { VariationOption } from './variationOption.schema';

export type VariationSchema = Variation & Document;

@Schema()
export class Variation {
  @Prop()
  id: number;

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VariationOption' }],
  })
  options: VariationOption[];
}

export const VariationSchema = SchemaFactory.createForClass(Variation);
