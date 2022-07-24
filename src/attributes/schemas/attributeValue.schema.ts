import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Shop } from 'src/shops/schemas/shop.shema';
import { Attribute } from './attribute.schema';

export type AttributeValueSchema = AttributeValue & Document;

@Schema()
export class AttributeValue {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop()
  value: string;

  @Prop()
  meta: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' })
  attribute: Attribute;
}

export const AttributeValueSchema =
  SchemaFactory.createForClass(AttributeValue);
