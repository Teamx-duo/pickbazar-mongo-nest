import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from './address.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type UserAddressSchema = UserAddress & Document;

@Schema()
export class UserAddress {
  @Prop()
  street_address: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  })
  address: Address;
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);

UserAddressSchema.plugin(mongoosePaginate);
