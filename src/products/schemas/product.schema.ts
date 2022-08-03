import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AttributeValue } from 'src/attributes/schemas/attributeValue.schema';
import { Category } from 'src/categories/schemas/category.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Order } from 'src/orders/schemas/order.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { Tag } from 'src/tags/schemas/tag.schema';
import { Type } from 'src/types/schemas/type.schema';
import { Variation } from './variation.schema';
import { VariationOption } from './variationOption.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ProductSchema = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true })
  type: Type;

  @Prop({ enum: ['simple', 'variable'], default: 'simple' })
  product_type: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
  })
  categories: Category[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variation' }],
  })
  variations: Variation[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VariationOption' }],
  })
  variation_options: VariationOption[];

  @Prop(
    raw({
      variation_option_id: { type: Number },
      order_quantity: { type: Number },
      unit_price: { type: Number },
      subtotal: { type: Number },
    }),
  )
  pivot: Record<string, any>;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  in_stock: boolean;

  @Prop({ required: true })
  is_taxable: boolean;

  @Prop({ required: true })
  sale_price: number;

  @Prop({ required: true })
  max_price: number;

  @Prop({ required: true })
  min_price: number;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  gallery: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ enum: ['published', 'draft'], default: 'published' })
  status: string;

  @Prop()
  height: string;

  @Prop()
  length: string;

  @Prop()
  width: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  unit: string;
}

// name: string;
// slug: string;
// type: Type;
// type_id: number;
// product_type: ProductType;
// categories: Category[];
// tags?: Tag[];
// variations?: AttributeValue[];
// variation_options?: Variation[];
// pivot?: OrderProductPivot;
// orders?: Order[];
// shop: Shop;
// shop_id: number;
// related_products?: Product[];
// description: string;
// in_stock: boolean;
// is_taxable: boolean;
// sale_price?: number;
// max_price?: number;
// min_price?: number;
// sku?: string;
// gallery?: Attachment[];
// image?: Attachment;
// status: ProductStatus;
// height?: string;
// length?: string;
// width?: string;
// price?: number;
// quantity: number;
// unit: string;

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.plugin(mongoosePaginate);
