import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  Notification,
  NotificationSchema,
} from './schemas/notifications.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  GetNotificationsDto,
  ReadNotificationsDto,
} from './dto/get-notification.dto';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: PaginateModel<NotificationSchema>,
  ) {}
  async create(createNotificationDto: CreateNotificationDto) {
    return await this.notificationModel.create(createNotificationDto);
  }

  async findAll({
    description,
    title,
    order_id,
    notification_type,
    unread,
    user,
    page,
    limit,
    orderBy,
    sortedBy,
  }: GetNotificationsDto) {
    const response = await this.notificationModel.paginate(
      {
        unread: Boolean(unread),
        ...(order_id ? { order_id } : {}),
        ...(notification_type ? { notification_type } : {}),
        ...(user ? { user } : {}),
      },
      {
        page,
        limit,
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return PaginationResponse(response);
  }

  async readNotifications({ user }: ReadNotificationsDto) {
    return await this.notificationModel.updateMany(
      { user },
      { $set: { unread: false } },
    );
  }

  async findOne(id: string) {
    return await this.notificationModel.findById(id);
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.notificationModel.findByIdAndUpdate(
      id,
      {
        $set: updateNotificationDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.notificationModel.findByIdAndRemove(id, { new: true });
  }
}
