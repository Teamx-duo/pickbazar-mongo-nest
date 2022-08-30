import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { ContactDetail } from './contactDetails.schema';

export type LocationSchema = Location & Document;

@Schema()
export class Location {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Prop()
  lat: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  @Prop()
  lng: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  state: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  zip: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  formattedAddress: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
