import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TaxesSchema = Tax & Document;

@Schema()
export class Tax {
  @Prop()
  name: string;

  @Prop()
  rate: number;

  @Prop()
  is_global: boolean;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop()
  city: string;

  @Prop()
  priority: number;

  @Prop()
  on_shipping: boolean;
}

export const TaxesSchema = SchemaFactory.createForClass(Tax);
