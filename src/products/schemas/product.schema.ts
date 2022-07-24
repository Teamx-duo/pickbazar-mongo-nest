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

export type ProductSchema = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @Prop()
  type_id: number;

  @Prop({ enum: ['simple', 'variable'] })
  product_type: string;

  @Prop()
  categories: Category[];

  @Prop()
  tags: Tag[];

  @Prop()
  variations: AttributeValue[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variation' }] })
  variation_options: Variation[];

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop()
  shop_id: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }] })
  related_products: Product[];

  @Prop()
  description: string;

  @Prop()
  in_stock: boolean;

  @Prop()
  is_taxable: boolean;

  @Prop()
  sale_price: number;

  @Prop()
  max_price: number;

  @Prop()
  min_price: number;

  @Prop()
  sku: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }] })
  gallery: Attachment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  image: Attachment;

  @Prop({ enum: ['publish', 'draft'] })
  status: string;

  @Prop()
  height: string;

  @Prop()
  length: string;

  @Prop()
  width: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
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
