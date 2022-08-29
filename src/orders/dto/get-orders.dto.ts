import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Order } from '../schemas/order.schema';

export class OrderPaginator {
  data: Order[];
}

export enum QueryOrdersOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TOTAL = 'total',
}

export class GetOrdersDto extends PaginationArgs {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsEnum(QueryOrdersOrderByColumn)
  @ApiPropertyOptional({ enum: QueryOrdersOrderByColumn })
  @IsOptional()
  orderBy?: QueryOrdersOrderByColumn = QueryOrdersOrderByColumn.CREATED_AT;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.ASC;

  @IsMongoId()
  @IsOptional()
  customer?: string;

  @IsMongoId()
  @IsOptional()
  shop?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
