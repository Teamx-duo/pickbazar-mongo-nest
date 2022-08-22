import { Transform } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Category } from '../entities/category.entity';

export class CategoryPaginator extends Paginator<Category> {
  data: Category[];
}

export enum QueryCategoriesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}

export class GetCategoriesDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  orderBy?: QueryCategoriesOrderByColumn =
    QueryCategoriesOrderByColumn.CREATED_AT;
  @IsString()
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
  @IsMongoId()
  @IsOptional()
  type?: string;
  @IsString()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @IsOptional()
  parent?: number = null;
}
