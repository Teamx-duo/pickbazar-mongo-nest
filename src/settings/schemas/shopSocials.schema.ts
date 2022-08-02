import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Shop } from 'src/shops/schemas/shop.shema';

export type ShopSocialsSchema = ShopSocials & Document;

@Schema()
export class ShopSocials {
  @IsString()
  @Prop({ required: true })
  icon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @IsString()
  @Prop({ required: true })
  url: string;
}

export const ShopSocialsSchema = SchemaFactory.createForClass(ShopSocials);
