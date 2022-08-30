import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';
import { Withdraw } from '../entities/withdraw.entity';

export class WithdrawPaginator extends Paginator<Withdraw> {
  data: Withdraw[];
}

export enum QueryWithdrawOrderByColumn {
  CREATED_AT = 'createdAt',
  AMOUNT = 'amount',
  UPDATED_AT = 'updatedAt',
}
export class GetWithdrawsDto extends PaginationArgs {
  @IsEnum(QueryWithdrawOrderByColumn)
  @ApiPropertyOptional({ enum: QueryWithdrawOrderByColumn })
  @IsOptional()
  orderBy?: QueryWithdrawOrderByColumn = QueryWithdrawOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  status?: string;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  shop_id?: string;
}
