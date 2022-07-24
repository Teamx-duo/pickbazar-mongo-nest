import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserAddress } from './userAddress.schema';

export type AddressSchema = Address & Document;

@Schema()
export class Address {
  @Prop()
  title: string;

  @Prop()
  default: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address: UserAddress;

  @Prop({ enum: ['billing', 'shipping'] })
  type: string;

  @Prop()
  customer: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
