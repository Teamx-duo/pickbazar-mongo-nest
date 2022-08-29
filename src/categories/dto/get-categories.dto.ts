import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
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
  @IsEnum(QueryCategoriesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryCategoriesOrderByColumn })
  @IsOptional()
  orderBy?: QueryCategoriesOrderByColumn =
    QueryCategoriesOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  type?: string;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  parent?: number = null;
}
