import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { OrderStatus } from '../schemas/orderStatus.schema';

export class OrderStatusPaginator extends Paginator<OrderStatus> {
  data: OrderStatus[];
}

export enum QueryOrderStatusesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
  SERIAL = 'serial',
}

export class GetOrderStatusesDto extends PaginationArgs {
  @IsEnum(QueryOrderStatusesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryOrderStatusesOrderByColumn })
  @IsOptional()
  orderBy?: QueryOrderStatusesOrderByColumn =
    QueryOrderStatusesOrderByColumn.SERIAL;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.ASC;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
}
