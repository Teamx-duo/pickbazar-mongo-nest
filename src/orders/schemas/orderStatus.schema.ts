import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Product } from 'src/products/schemas/product.schema';

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
  @Prop({ required: true, unique: true })
  serial: number;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);

OrderStatusSchema.plugin(mongoosePaginate);
