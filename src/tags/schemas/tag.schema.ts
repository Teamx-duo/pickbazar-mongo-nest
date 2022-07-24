import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Product } from 'src/products/schemas/product.schema';
import { Type } from 'src/types/schemas/type.schema';

export type TagSchema = Tag & Document;

@Schema()
export class Tag {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  parent: number;

  @Prop()
  details: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: Attachment;

  @Prop()
  icon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
