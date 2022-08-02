import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Order } from '../schemas/order.schema';

export class OrderPaginator {
  data: Order[];
}

export class GetOrdersDto extends PaginationArgs {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  sortedBy?: string;

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
