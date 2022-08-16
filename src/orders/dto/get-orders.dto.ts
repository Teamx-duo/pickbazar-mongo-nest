import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
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
}

export class GetOrdersDto extends PaginationArgs {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  orderBy?: QueryOrdersOrderByColumn = QueryOrdersOrderByColumn.CREATED_AT;

  @IsString()
  @ApiPropertyOptional()
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
