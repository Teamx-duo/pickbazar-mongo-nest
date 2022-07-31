import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';
import { Variation } from './variation.schema';

export type VariationOptionSchema = VariationOption & Document;

@Schema()
export class VariationOption {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
  })
  value: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  product: Product[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variation',
    required: true,
  })
  variation: Variation;
}

export const VariationOptionSchema =
  SchemaFactory.createForClass(VariationOption);
