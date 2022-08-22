import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export enum QueryAttributesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}
export class GetAttributesArgs extends PaginationArgs {
  @IsString()
  @ApiPropertyOptional({ enum: QueryAttributesOrderByColumn })
  @IsOptional()
  orderBy?: QueryAttributesOrderByColumn;

  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder;

  @IsMongoId()
  @IsOptional()
  shop?: string;
}
