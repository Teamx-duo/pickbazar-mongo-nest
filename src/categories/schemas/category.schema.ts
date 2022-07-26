import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Type } from 'src/types/schemas/type.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type CategorySchema = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  children?: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true })
  details: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true })
  type: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products?: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(mongoosePaginate);
