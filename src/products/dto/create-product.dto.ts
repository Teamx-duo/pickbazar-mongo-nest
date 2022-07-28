import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum ProductStatuses {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}
export class CreateProductDto {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsString()
  @ApiProperty()
  public type: string;

  @IsString()
  @ApiProperty()
  public description: string;

  @IsBoolean()
  @ApiProperty()
  @Transform((val) => JSON.parse(val.value.toLowerCase()))
  public in_stock: boolean;

  @IsBoolean()
  @ApiProperty()
  @Transform((val) => JSON.parse(val.value.toLowerCase()))
  public is_taxable: boolean;

  @IsNumber()
  @ApiProperty()
  @Transform((val) => parseInt(val.value))
  public sale_price: number;

  @IsNumber()
  @ApiProperty()
  @Transform((val) => parseInt(val.value))
  public max_price: number;

  @IsNumber()
  @ApiProperty()
  @Transform((val) => parseInt(val.value))
  public min_price: number;

  @IsNumber()
  @ApiProperty()
  @Transform((val) => parseInt(val.value))
  public price: number;

  @IsNumber()
  @ApiProperty()
  @Transform((val) => parseInt(val.value))
  public quantity: number;

  @IsString()
  @ApiProperty()
  public sku: string;

  @IsString()
  @ApiProperty()
  public unit: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public status: string;

  @IsString()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  public gallery: string[];

  @IsOptional()
  @IsEnum(ProductStatuses)
  @ApiProperty()
  public image: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public variations: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public variation_options: string;

  @IsArray()
  @ApiProperty()
  public categories: string[];

  @IsArray()
  @ApiProperty()
  @IsOptional()
  public tags: string[];

  @IsString()
  @ApiProperty()
  public shop: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public height: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public length: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public width: string;
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
