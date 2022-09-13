import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { Notification } from '../schemas/notifications.schema';
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
  @Transform((val) => JSON.parse(val.value))
  @IsBoolean()
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

export class ReadNotificationsDto extends PickType(Notification, ['user']) {}
