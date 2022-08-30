import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Shop } from 'src/shops/schemas/shop.shema';

export type ShopSocialsSchema = ShopSocials & Document;

@Schema()
export class ShopSocials {
  @IsString()
  @MaxLength(500)
  @IsOptional()
  @Prop()
  icon: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  @Prop()
  url: string;
}

export const ShopSocialsSchema = SchemaFactory.createForClass(ShopSocials);
