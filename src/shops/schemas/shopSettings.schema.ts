import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({
    type: [{ type: [ShopSocialsSchema] }],
  })
  socials: ShopSocials[];

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  contact: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ type: LocationSchema })
  location: Location;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  website: string;
}

export const ShopSettingsSchema = SchemaFactory.createForClass(ShopSettings);
