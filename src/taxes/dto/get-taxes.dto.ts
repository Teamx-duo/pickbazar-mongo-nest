import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';

export enum QueryTaxClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
  RATE = 'rate',
}
export class GetTaxesDto {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  @IsString()
  @ApiPropertyOptional({ enum: QueryTaxClassesOrderByColumn })
  @IsOptional()
  orderBy?: QueryTaxClassesOrderByColumn;
  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  country?: string;
  @IsNumber()
  @Transform((val) => parseInt(val.value))
  @ApiPropertyOptional()
  @IsOptional()
  priority?: number;
  global?: boolean;
}
