import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export enum QueryStaffClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
}
export class GetStaffsDto extends PaginationArgs {
  @IsString()
  @ApiPropertyOptional({ enum: QueryStaffClassesOrderByColumn })
  @IsOptional()
  orderBy?: QueryStaffClassesOrderByColumn;

  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder;

  @IsMongoId()
  @IsOptional()
  shop_id?: string;
}
