import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LocationSchema = Location & Document;

@Schema()
export class Location {
  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  zip: string;

  @Prop()
  formattedAddress: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
