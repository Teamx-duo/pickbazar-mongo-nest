import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { AttributeValue } from './attributeValue.schema';

export type AttributeSchema = Attribute & Document;

@Schema()
export class Attribute {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop()
  slug: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }],
  })
  values: AttributeValue[];
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
