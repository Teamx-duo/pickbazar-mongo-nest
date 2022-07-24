import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Type } from 'src/types/schemas/type.schema';

export type CategorySchema = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent: this;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  children: this[];

  @Prop()
  details: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: Attachment;

  @Prop()
  icon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
