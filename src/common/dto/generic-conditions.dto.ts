export class WhereHasConditions {
  operator: SQLOperator;
  value: string;
}
export class WhereHasConditionsRelation {
  relation: string;
  operator: SQLOperator;
  amount = 1;
}

export enum SortOrder {
  ASC = 1,
  DESC = -1,
}

export enum SQLOperator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  GT = 'GT',
}
