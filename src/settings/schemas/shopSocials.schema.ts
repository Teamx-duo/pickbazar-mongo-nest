import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ShopSocialsSchema = ShopSocials & Document;

@Schema()
export class ShopSocials {
  @Prop()
  icon: string;

  @Prop()
  url: string;
}

export const ShopSocialsSchema = SchemaFactory.createForClass(ShopSocials);
