import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { Tag } from '../entities/tag.entity';

export class TagPaginator extends Paginator<Tag> {
  data: Tag[];
}

export enum QueryTagsOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}

export class GetTagsDto extends PaginationArgs {
  @IsString()
  @ApiPropertyOptional({ enum: QueryTagsOrderByColumn })
  @IsOptional()
  orderBy?: QueryTagsOrderByColumn;
  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  type?: string;
}
