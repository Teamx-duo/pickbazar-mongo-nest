import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Variation } from './variation.schema';

export type VariationOptionSchema = VariationOption & Document;

@Schema()
export class VariationOption {
  @Prop()
  name: string;

  @Prop()
  value: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Variation' })
  variantion: Variation;
}

export const VariationOptionSchema =
  SchemaFactory.createForClass(VariationOption);
