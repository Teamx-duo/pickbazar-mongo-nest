import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export enum QueryAttributesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}
export class GetAttributesArgs extends PaginationArgs {
  @IsEnum(QueryAttributesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryAttributesOrderByColumn })
  @IsOptional()
  orderBy?: QueryAttributesOrderByColumn =
    QueryAttributesOrderByColumn.CREATED_AT;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @IsMongoId()
  @IsOptional()
  shop?: string;
}
