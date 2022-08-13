import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Product } from '../schemas/product.schema';
import { VariationOption } from '../schemas/variationOption.schema';
export class CreateProductDto extends PickType(Product, [
  'categories',
  'description',
  'gallery',
  'height',
  'image',
  'in_stock',
  'is_taxable',
  'length',
  'max_price',
  'min_price',
  'name',
  'orders',
  'price',
  'product_type',
  'quantity',
  'sale_price',
  'shop',
  'sku',
  'slug',
  'status',
  'tags',
  'type',
  'unit',
  'variations',
  'width',
  'rating_count',
]) {
  @IsOptional()
  @ApiProperty()
  variation_options: { upsert: VariationOption[]; delete: VariationOption[] };
}

// export class CreateProductDto extends PickType(Product, [
//   'id',
//   'slug',
//   'created_at',
//   'updated_at',
//   'orders',
//   'pivot',
//   'shop',
//   'categories',
//   'tags',
//   'type',
//   'related_products',
//   // 'variation_options',
// ]) {
//   categories: number[];
//   tags: number[];
// }
