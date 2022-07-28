import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ShopSettings } from './shopSettings.schema';
import { Balance } from './balance.schema';
import { UserAddress } from 'src/addresses/schemas/userAddress.schema';
import { User } from 'src/users/schema/user.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type ShopSchema = Shop & Document;

@Schema()
export class Shop {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  staffs: User[];

  @Prop({ required: true, default: false })
  is_active: boolean;

  @Prop({ required: true, default: 0, min: 0 })
  orders_count: number;

  @Prop({ required: true, default: 0, min: 0 })
  products_count: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Balance',
    // required: true,
  })
  balance: Balance;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
  })
  cover_image: string;

  @Prop({
    required: true,
  })
  logo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAddress',
  })
  address: UserAddress;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopSettings',
  })
  settings: ShopSettings;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

ShopSchema.plugin(mongoosePaginate);
