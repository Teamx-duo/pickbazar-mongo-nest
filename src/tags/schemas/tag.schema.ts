import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Product } from 'src/products/schemas/product.schema';
import { Type } from 'src/types/schemas/type.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type TagSchema = Tag & Document;

@Schema()
export class Tag {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  details: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.plugin(mongoosePaginate);
