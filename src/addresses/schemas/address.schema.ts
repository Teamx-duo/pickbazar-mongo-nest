import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { UserAddress } from './userAddress.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type AddressSchema = Address & Document;

export enum AddressType {
  BILLING = 'billing',
  SHIPPING = 'shipping',
}

@Schema()
export class Address {
  @Prop()
  title: string;

  @Prop()
  default: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress',
    required: true,
  })
  address: UserAddress;

  @Prop({ enum: [AddressType.BILLING, AddressType.SHIPPING] })
  type: AddressType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
}
export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.plugin(mongoosePaginate);
