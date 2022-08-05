import { PaginationArgs } from 'src/common/dto/pagination-args.dto';

export class GetPopularProductsDto extends PaginationArgs {
  shop_id?: string;
}
