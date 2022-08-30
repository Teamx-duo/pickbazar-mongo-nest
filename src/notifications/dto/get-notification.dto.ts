import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { CreateNotificationDto } from './create-notification.dto';

export enum QueryOrdersOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class GetNotificationsDto extends PartialType(CreateNotificationDto) {
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  limit?: number = 15;
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  page?: number = 1;
  @IsOptional()
  @IsString()
  unread: boolean;
  @IsEnum(QueryOrdersOrderByColumn)
  @ApiPropertyOptional({ enum: QueryOrdersOrderByColumn })
  @IsOptional()
  orderBy?: QueryOrdersOrderByColumn = QueryOrdersOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional()
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.ASC;
}
