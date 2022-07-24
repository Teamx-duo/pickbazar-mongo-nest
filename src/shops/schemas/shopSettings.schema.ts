import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ShopSocials } from 'src/settings/schemas/shopSocials.schema';

export type ShopSettingsSchema = ShopSettings & Document;

@Schema()
export class ShopSettings {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShopSocials' }],
  })
  socials: ShopSocials[];

  @Prop()
  contact: boolean;

  @Prop()
  location: string;

  @Prop()
  website: string;
}

export const ShopSettingsSchema = SchemaFactory.createForClass(ShopSettings);
