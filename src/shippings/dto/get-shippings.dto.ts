import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';

export enum QueryShippingClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  AMOUNT = 'amount',
}

export class GetShippingsDto {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  text?: string;
  @IsEnum(QueryShippingClassesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryShippingClassesOrderByColumn })
  @IsOptional()
  orderBy?: QueryShippingClassesOrderByColumn =
    QueryShippingClassesOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
}
