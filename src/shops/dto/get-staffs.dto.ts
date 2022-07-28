import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export class GetStaffsDto extends PaginationArgs {
  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsString()
  @IsOptional()
  sortedBy?: string;

  @IsString()
  shop_id?: string;
}
