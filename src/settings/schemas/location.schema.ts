import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Document } from 'mongoose';

export type LocationSchema = Location & Document;

export enum GeoJsonTypes {
  LINE_STRING = 'LineString',
  POINT = 'Point',
}

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

  @IsNumber({}, { each: true })
  @IsArray()
  @ApiProperty()
  @Prop()
  coordinates: number[];

  @IsEnum(GeoJsonTypes)
  @IsOptional()
  @ApiProperty()
  @Prop({ default: 'Point', enum: GeoJsonTypes })
  type: GeoJsonTypes = GeoJsonTypes.POINT;

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
