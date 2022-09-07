import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { UserAddress, UserAddressSchema } from './userAddress.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString,
  IsMongoId,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export type AddressSchema = Address & Document;

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

@Schema({ timestamps: true })
export class Address {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Prop({ required: true })
  @ApiProperty({ required: true })
  title: string;

  @Prop({ default: false })
  @IsBoolean()
  @IsOptional()
  default: boolean;

  @ValidateNested()
  @Type(() => UserAddress)
  @ApiProperty()
  @IsOptional()
  @Prop({
    type: UserAddressSchema,
  })
  address: UserAddress;

  @Prop({ enum: [AddressType.BILLING, AddressType.SHIPPING], required: true })
  @ApiProperty({ required: true })
  @IsEnum(AddressType)
  type: AddressType;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.index({ customer: 1 });

AddressSchema.plugin(mongoosePaginate);
