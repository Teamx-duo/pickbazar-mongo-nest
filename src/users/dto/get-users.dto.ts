import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';
import { Paginator } from 'src/common/dto/paginator.dto';

import { User } from '../schema/user.schema';

export class UserPaginator extends Paginator<User> {
  data: User[];
}

export class GetUsersDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  orderBy?: QueryUsersOrderByColumn;
  @IsString()
  @IsOptional()
  sortedBy?: SortOrder;
  @IsString()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @IsOptional()
  shop?: string;
  @IsString()
  @IsOptional()
  roles?: string;
}

export enum QueryUsersOrderByColumn {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
