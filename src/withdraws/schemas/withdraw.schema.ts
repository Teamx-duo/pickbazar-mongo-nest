import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Shop } from 'src/shops/schemas/shop.shema';

export type WithdrawSchema = Withdraw & Document;

export enum PaymentGatewayType {
  STRIPE = 'STRIPE',
  BANK_WITHDRAW = 'BANK_WITHDRAW',
  PAYPAL = 'PAYPAL',
}

export enum WithdrawStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  ON_HOLD = 'on_hold',
  REJECTED = 'rejected',
  PROCESSING = 'processing',
}
@Schema({ timestamps: true })
export class Withdraw {
  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  amount: number;

  @IsEnum(WithdrawStatus)
  @ApiProperty({ enum: WithdrawStatus })
  @Prop({
    required: true,
    default: WithdrawStatus.PENDING,
    enum: [
      WithdrawStatus.APPROVED,
      WithdrawStatus.PENDING,
      WithdrawStatus.ON_HOLD,
      WithdrawStatus.REJECTED,
      WithdrawStatus.PROCESSING,
    ],
  })
  status: WithdrawStatus = WithdrawStatus.PENDING;

  @IsMongoId()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @IsEnum(PaymentGatewayType)
  @ApiProperty()
  @Prop({ enum: PaymentGatewayType })
  payment_method: PaymentGatewayType = PaymentGatewayType.PAYPAL;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  details: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  note: string;
}

export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);
WithdrawSchema.plugin(mongoosePaginate);
