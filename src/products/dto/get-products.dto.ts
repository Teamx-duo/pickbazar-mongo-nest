import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Product } from '../entities/product.entity';

export class ProductPaginator extends Paginator<Product> {
  data: Product[];
}

export enum QueryProductsOrderByColumn {
  CREATED_AT = 'createdAt',
  PRICE = 'price',
  MIN_PRICE = 'min_price',
  MAX_PRICE = 'max_price',
  SALE_PRICE = 'sale_price',
  RATING = 'rating',
  ORDERS = 'orders',
  QUANTITY = 'quantity',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}

export class GetProductsDto extends PaginationArgs {
  @IsEnum(QueryProductsOrderByColumn)
  @ApiPropertyOptional({ enum: QueryProductsOrderByColumn })
  @IsOptional()
  orderBy?: QueryProductsOrderByColumn = QueryProductsOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  shop?: string;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  type?: string;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  category?: string;
}

export class GetVariationsDto extends PaginationArgs {
  orderBy?: QueryProductsOrderByColumn;
  sortedBy?: SortOrder;
  productId?: string;
  search?: string;
}
