import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from 'src/addresses/schemas/address.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { Profile } from './../entities/profile.entity';

export type UserSchema = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop: Shop;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' })
  profile: Profile;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] })
  shops: Shop[];

  @Prop()
  is_active: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
  address: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);
