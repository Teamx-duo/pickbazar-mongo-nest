import { IsMongoId, IsOptional } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export class GetAttributesArgs extends PaginationArgs {
  orderBy?: QueryAttributesOrderByOrderByClause[];

  @IsMongoId()
  @IsOptional()
  shop?: string;
}

export class QueryAttributesOrderByOrderByClause {
  column: QueryAttributesOrderByColumn;
  order: SortOrder;
}
export enum QueryAttributesOrderByColumn {
  CREATED_AT = 'CREATED_AT',
  NAME = 'NAME',
  UPDATED_AT = 'UPDATED_AT',
}
