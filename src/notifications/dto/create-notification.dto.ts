import { PickType } from '@nestjs/swagger';
import { Notification } from '../schemas/notifications.schema';

export class CreateNotificationDto extends PickType(Notification, [
  'title',
  'description',
  'order_id',
  'notification_type',
  'unread',
  'user',
]) {}
