import { IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export class GetTypesDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  orderBy?: QueryTypesOrderByColumn;
  @IsString()
  @IsOptional()
  text?: string;
}

export class QueryTypesOrderByOrderByClause {
  column: QueryTypesOrderByColumn;
  order: SortOrder;
}

export enum QueryTypesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}
