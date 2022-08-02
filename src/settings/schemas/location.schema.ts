import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { ContactDetail } from './contactDetails.schema';

export type LocationSchema = Location & Document;

@Schema()
export class Location {
  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  lat: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  lng: number;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  city: string;

  @IsString()
  @ApiProperty()
  @Prop()
  state: string;

  @IsString()
  @ApiProperty()
  @Prop()
  country: string;

  @IsString()
  @ApiProperty()
  @Prop()
  zip: string;

  @IsString()
  @ApiProperty()
  @Prop()
  formattedAddress: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
