import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Location } from './location.schema';
import { ShopSocials } from './shopSocials.schema';

export type ContactDetailSchema = ContactDetail & Document;

@Schema()
export class ContactDetail {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShopSocials' }],
  })
  socials: ShopSocials[];

  @Prop()
  contact: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  location: Location;

  @Prop()
  website: string;
}

export const ContactDetailSchema = SchemaFactory.createForClass(ContactDetail);
