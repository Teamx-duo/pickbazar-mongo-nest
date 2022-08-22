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
import { ShopSocials, ShopSocialsSchema } from './shopSocials.schema';

export type ContactDetailSchema = ContactDetail & Document;

@Schema()
export class ContactDetail {
  @IsOptional()
  @ApiProperty()
  @Prop({ type: [ShopSocialsSchema] })
  socials: ShopSocials[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  contact: string;

  @ApiProperty()
  @IsOptional()
  @Prop({ type: Location })
  location: Location;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @Prop()
  website: string;
}

export const ContactDetailSchema = SchemaFactory.createForClass(ContactDetail);
