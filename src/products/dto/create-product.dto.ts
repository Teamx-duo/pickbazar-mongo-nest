import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  CreateVariationDto,
  CreateVariationOptionDto,
  CreateVariationOptionsDto,
} from './create-variation.dto';

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
  public in_stock: boolean;

  @IsBoolean()
  @ApiProperty()
  public is_taxable: boolean;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public sale_price: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public max_price: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public min_price: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
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

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  public gallery: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  public image: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  public variations: string[];

  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty()
  public variation_options: {
    upsert: CreateVariationDto[];
    delete: CreateVariationDto[];
  };

  @IsMongoId({ each: true })
  @IsArray()
  @ApiProperty()
  public categories: string[];

  @IsMongoId({ each: true })
  @IsArray()
  @ApiProperty()
  @IsOptional()
  public tags: string[];

  @IsMongoId()
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
