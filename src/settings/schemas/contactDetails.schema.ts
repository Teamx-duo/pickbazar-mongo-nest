import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Location } from './location.schema';
import { Setting } from './setting.schema';
import { ShopSocials } from './shopSocials.schema';

export type ContactDetailSchema = ContactDetail & Document;

@Schema()
export class ContactDetail {
  @ValidateNested({ each: true })
  @Type(() => ShopSocials)
  @IsArray()
  @IsOptional()
  @ApiProperty()
  @Prop()
  socials: ShopSocials[];

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  contact: string;

  @ValidateNested()
  @Type(() => Location)
  @ApiProperty()
  @IsOptional()
  @Prop()
  location: Location;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @Prop()
  website: string;
}

export const ContactDetailSchema = SchemaFactory.createForClass(ContactDetail);
