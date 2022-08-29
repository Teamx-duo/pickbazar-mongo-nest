import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Location, LocationSchema } from 'src/settings/schemas/location.schema';
import {
  ShopSocials,
  ShopSocialsSchema,
} from 'src/settings/schemas/shopSocials.schema';
import { Shop } from './shop.shema';

export type ShopSettingsSchema = ShopSettings & Document;

@Schema()
export class ShopSettings {
  @ValidateNested({ each: true })
  @Type(() => ShopSocials)
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({
    type: [{ type: [ShopSocialsSchema] }],
  })
  socials: ShopSocials[];

  @IsPhoneNumber(null, { message: 'Contact must be a valid phone number.' })
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  contact: string;

  @Type(() => Location)
  @ValidateNested()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ type: LocationSchema })
  location: Location;

  @IsString()
  @MinLength(7)
  @MaxLength(500)
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  website: string;
}

export const ShopSettingsSchema = SchemaFactory.createForClass(ShopSettings);
