import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Order } from 'src/orders/schemas/order.schema';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoosePaginate from 'mongoose-paginate-v2';
import { User } from 'src/users/schema/user.schema';

export type NotificationSchema = Notification & Document;

export enum NotifcationType {
  ORDER = 'order',
  PROFILE = 'profile',
  VERIFICATION = 'verification',
  COUPON = 'coupon',
  PROMOTION = 'promotion',
  MISCALLENEOUS = 'miscalleneous',
}

@Schema({ timestamps: true })
export class Notification {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @ApiProperty()
  @Prop()
  description: string;

  @IsMongoId()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @IsBoolean()
  @ApiProperty()
  @Prop({ default: true })
  unread: boolean;

  @IsMongoId()
  @ApiProperty()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order_id: mongoose.Schema.Types.ObjectId;

  @IsEnum(NotifcationType)
  @ApiProperty({ enum: NotifcationType })
  @IsOptional()
  @Prop({ enum: NotifcationType, default: NotifcationType.MISCALLENEOUS })
  notification_type: NotifcationType;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.plugin(mongoosePaginate);
