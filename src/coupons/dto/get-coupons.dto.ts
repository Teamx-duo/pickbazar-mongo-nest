import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Coupon } from '../entities/coupon.entity';

export class CouponPaginator extends Paginator<Coupon> {
  data: Coupon[];
}

export enum QueryCouponsOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  CODE = 'code',
  AMOUNT = 'amount',
}
export class GetCouponsDto extends PaginationArgs {
  @IsEnum(QueryCouponsOrderByColumn)
  @ApiPropertyOptional({ enum: QueryCouponsOrderByColumn })
  @IsOptional()
  orderBy?: QueryCouponsOrderByColumn = QueryCouponsOrderByColumn.CREATED_AT;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
}
