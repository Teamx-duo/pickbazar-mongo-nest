import { SortOrder } from 'src/common/dto/generic-conditions.dto';

export class GetShippingsDto {
  text?: string;
  orderBy?: QueryShippingClassesOrderByColumn;
  sortedBy?: SortOrder;
}

export enum QueryShippingClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  AMOUNT = 'amount',
}
