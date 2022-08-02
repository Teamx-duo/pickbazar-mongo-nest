import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type OrderStatusSchema = OrderStatus & Document;

@Schema()
export class OrderStatus {
  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  color: string;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  serial: number;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);

OrderStatusSchema.plugin(mongoosePaginate);
