import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Product } from '../entities/product.entity';

export class ProductPaginator extends Paginator<Product> {
  data: Product[];
}

export class GetProductsDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  orderBy?: QueryProductsOrderByColumn;
  @IsString()
  @IsOptional()
  sortedBy?: SortOrder;
  @IsMongoId()
  @IsOptional()
  shop?: string;
  @IsMongoId()
  @IsOptional()
  type?: string;
  @IsString()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @IsOptional()
  category?: string;
}

export class GetVariationsDto extends PaginationArgs {
  orderBy?: QueryProductsOrderByColumn;
  sortedBy?: SortOrder;
  productId?: string;
  search?: string;
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
