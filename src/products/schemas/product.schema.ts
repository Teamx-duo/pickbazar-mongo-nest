import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AttributeValue } from 'src/attributes/schemas/attributeValue.schema';
import { Category } from 'src/categories/schemas/category.schema';
import { Order } from 'src/orders/schemas/order.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { Tag } from 'src/tags/schemas/tag.schema';
import { Type } from 'src/types/schemas/type.schema';
import { Variation, VariationSchema } from './variation.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductPivot } from './productPivot.schema';
import { Rating, RatingSchema } from './rating.schema';

export type ProductSchema = Product & Document;
export enum ProductType {
  SIMPLE = 'simple',
  VARIABLE = 'variable',
}

export enum ProductStatus {
  PUBLISH = 'publish',
  DRAFT = 'draft',
}

@Schema({ timestamps: true })
export class Product {
  @IsString()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(100)
  @Prop({ required: true, unique: true })
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(150)
  @Prop({ required: true, unique: true })
  @ApiProperty()
  slug: string;

  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true })
  @ApiProperty()
  type: Type;

  @IsEnum(ProductType)
  @IsOptional()
  @Prop({
    enum: [ProductType.SIMPLE, ProductType.VARIABLE],
    default: ProductType.SIMPLE,
  })
  @ApiProperty()
  product_type: string;

  @IsMongoId({ each: true })
  @IsArray()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true,
  })
  @ApiProperty()
  categories: Category[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  @ApiProperty()
  tags?: Tag[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }],
  })
  @ApiProperty()
  variations?: AttributeValue[];

  @IsOptional()
  @Prop({
    type: [VariationSchema],
  })
  @ApiProperty()
  variation_options?: Variation[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  @ApiProperty()
  orders: Order[];

  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  @ApiProperty()
  shop: Shop;

  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  @Prop({ required: true })
  @ApiProperty()
  description: string;

  @IsArray()
  @IsOptional()
  @Prop({ required: true, type: [RatingSchema] })
  @ApiPropertyOptional()
  rating_count: Rating[];

  @IsBoolean()
  @IsOptional()
  @Prop({ required: true, default: true })
  @ApiProperty()
  in_stock: boolean;

  @IsBoolean()
  @IsOptional()
  @Prop({ required: true, default: true })
  @ApiProperty()
  is_taxable: boolean;

  @IsNumber()
  @IsOptional()
  @Prop()
  @ApiProperty()
  sale_price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Prop({ default: 0, min: 0, max: 5 })
  ratings: number;

  @IsNumber()
  @IsOptional()
  @Prop()
  @ApiProperty()
  max_price: number;

  @IsNumber()
  @IsOptional()
  @Prop()
  @ApiProperty()
  min_price: number;

  @IsString()
  @IsOptional()
  @Prop()
  @ApiProperty()
  sku: string;

  @IsString({ each: true })
  @IsArray()
  @Prop({ required: true })
  @ApiProperty()
  gallery: string[];

  @IsString({ each: true })
  @Prop({ required: true })
  @ApiProperty()
  image: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  @Prop({
    enum: [ProductStatus.PUBLISH, ProductStatus.DRAFT],
    default: ProductStatus.PUBLISH,
  })
  @ApiProperty()
  status: ProductStatus;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  @Prop()
  @ApiProperty()
  height: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  @Prop()
  @ApiProperty()
  length: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  @Prop()
  @ApiProperty()
  width: string;

  @IsNumber()
  @IsOptional()
  @Prop()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsOptional()
  @Prop()
  @ApiProperty()
  quantity: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  @Prop({ required: true })
  @ApiProperty()
  unit: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({
  name: 'text',
  description: 'text',
});
ProductSchema.index({
  type: 1,
  categories: 1,
});
ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(mongooseAggregatePaginate);
