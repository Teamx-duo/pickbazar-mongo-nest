import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from './address.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export type UserAddressSchema = UserAddress & Document;

@Schema()
export class UserAddress {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsString()
  street_address: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsString()
  country: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsString()
  city: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsString()
  state: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  @IsString()
  zip: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  })
  @IsMongoId()
  @IsOptional()
  address: Address;
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);

UserAddressSchema.plugin(mongoosePaginate);
