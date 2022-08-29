import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

import { Paginator } from 'src/common/dto/paginator.dto';
import { Shop } from '../entities/shop.entity';

export class ShopPaginator extends Paginator<Shop> {
  data: Shop[];
}

export enum QueryShopsClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  ORDERS = 'orders_count',
  PRODUCTS = 'products_count',
}

export class GetShopsDto extends PaginationArgs {
  @IsEnum(QueryShopsClassesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryShopsClassesOrderByColumn })
  @IsOptional()
  orderBy?: QueryShopsClassesOrderByColumn =
    QueryShopsClassesOrderByColumn.CREATED_AT;
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  is_active?: boolean;
}
