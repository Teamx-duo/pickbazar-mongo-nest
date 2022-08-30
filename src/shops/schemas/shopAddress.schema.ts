import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Document } from 'mongoose';

export type ShopAddressSchema = ShopAddress & Document;

@Schema()
export class ShopAddress {
  @IsString()
  @MaxLength(500)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  street_address: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  country: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  city: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  state: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  zip: string;
}

export const ShopAddressSchema = SchemaFactory.createForClass(ShopAddress);
