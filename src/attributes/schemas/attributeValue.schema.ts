import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Shop } from 'src/shops/schemas/shop.shema';
import { Attribute } from './attribute.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type AttributeValueSchema = AttributeValue & Document;

@Schema()
export class AttributeValue {
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @IsString()
  @Prop({ required: true })
  value: string;

  @IsString()
  @Prop({ required: true })
  meta: string;

  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true,
  })
  attribute: Attribute;
}

export const AttributeValueSchema =
  SchemaFactory.createForClass(AttributeValue);
AttributeValueSchema.plugin(mongoosePaginate);
