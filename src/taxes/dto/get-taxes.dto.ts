import { SortOrder } from 'src/common/dto/generic-conditions.dto';

export class GetTaxesDto {
  text?: string;
  orderBy?: QueryTaxClassesOrderByColumn;
  sortedBy?: SortOrder;
  country?: string;
  priority?: number;
  global?: boolean;
}

export enum QueryTaxClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  RATE = 'rate',
}
