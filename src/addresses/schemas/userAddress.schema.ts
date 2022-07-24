import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);
