import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ShopSettings } from './shopSettings.schema';
import { Balance } from './balance.schema';
import { UserAddress } from 'src/addresses/schemas/userAddress.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { User } from 'src/users/schema/user.schema';

export type ShopSchema = Shop & Document;

@Schema()
export class Shop {
  @Prop()
  owner_id: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  staffs: User[];

  @Prop()
  is_active: boolean;

  @Prop()
  orders_count: number;

  @Prop()
  products_count: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Balance' })
  balance: Balance;

  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  cover_image: Attachment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' })
  logo: Attachment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' })
  address: UserAddress;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ShopSettings' })
  settings: ShopSettings;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
