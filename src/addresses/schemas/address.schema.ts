import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { UserAddress } from './userAddress.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  IsMongoId,
  IsEnum,
  ValidateNested,
} from 'class-validator';

export type AddressSchema = Address & Document;

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsBoolean()
  default: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress',
    required: true,
  })
  address: UserAddress;

  @Prop({ enum: [AddressType.BILLING, AddressType.SHIPPING], required: true })
  @ApiProperty({ required: true })
  @IsEnum(AddressType)
  type: AddressType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ required: true })
  @IsMongoId()
  customer: User;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.plugin(mongoosePaginate);
