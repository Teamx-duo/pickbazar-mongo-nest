import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Order } from 'src/orders/schemas/order.schema';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Transform } from 'class-transformer';

export type CouponSchema = Coupon & Document;

export enum CouponType {
  FIXED_COUPON = 'fixed',
  PERCENTAGE_COUPON = 'percentage',
  FREE_SHIPPING_COUPON = 'free_shipping',
  DEFAULT_COUPON = 'fixed',
}

@Schema({ timestamps: true })
export class Coupon {
  @IsString()
  @ApiProperty()
  @Prop({ required: true, unique: true })
  code: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  orders: Order[];

  @IsEnum(CouponType)
  @ApiProperty({ enum: CouponType, enumName: 'type' })
  @Prop({
    enum: ['fixed', 'percentage', 'free_shipping'],
    default: 'fixed',
    required: true,
  })
  type: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @Prop({
    required: true,
  })
  image: string;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  @Prop({ default: true })
  is_valid: boolean;

  @Prop({ required: true })
  @IsNumber()
  @Transform((val) => parseInt(val.value))
  @ApiProperty()
  amount: number;

  @IsDate()
  @ApiProperty()
  @Transform((val) => new Date(val.value))
  @Prop({ required: true })
  active_from: Date;

  @IsDate()
  @ApiProperty()
  @Transform((val) => new Date(val.value))
  @Prop({ required: true })
  expire_at: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

CouponSchema.plugin(mongoosePaginate);
