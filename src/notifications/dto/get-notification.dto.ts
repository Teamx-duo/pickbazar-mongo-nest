import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateNotificationDto } from './create-notification.dto';

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
}
