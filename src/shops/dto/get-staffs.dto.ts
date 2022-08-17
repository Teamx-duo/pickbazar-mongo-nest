import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export class GetStaffsDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  sortedBy?: string;

  @IsMongoId()
  @IsOptional()
  shop_id?: string;
}
