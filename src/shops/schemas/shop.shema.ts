import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ShopSettings, ShopSettingsSchema } from './shopSettings.schema';
import { Balance, BalanceSchema } from './balance.schema';
import { UserAddress } from 'src/addresses/schemas/userAddress.schema';
import { User } from 'src/users/schema/user.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShopAddress, ShopAddressSchema } from './shopAddress.schema';
import { Type } from 'class-transformer';

export type ShopSchema = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: mongoose.Schema.Types.ObjectId;

  @IsMongoId({ each: true })
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
  })
  staffs: User[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Prop({ default: false })
  is_active: boolean;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Prop({ required: true, default: 0, min: 0 })
  orders_count: number;

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  @Prop({ required: true, default: 0, min: 0 })
  products_count: number;

  @ApiProperty()
  @Type(() => Balance)
  @ValidateNested()
  @IsOptional()
  @Prop({ type: BalanceSchema })
  balance: Balance;

  @IsString()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(100)
  @Prop({ required: true })
  name: string;

  @IsString()
  @ApiProperty()
  @MinLength(5)
  @MaxLength(150)
  @Prop({ required: true })
  slug: string;

  @IsString()
  @ApiProperty()
  @MinLength(10)
  @MaxLength(2000)
  @Prop({ required: true })
  description: string;

  @IsString()
  @MaxLength(500)
  @ApiProperty()
  @Prop({
    required: true,
  })
  cover_image: string;

  @IsString()
  @MaxLength(500)
  @ApiProperty()
  @Prop({
    required: true,
  })
  logo: string;

  @ApiProperty()
  @Type(() => ShopAddress)
  @ValidateNested()
  @IsOptional()
  @Prop({ type: ShopAddressSchema })
  address: ShopAddress;

  @ApiProperty()
  @Type(() => ShopSettings)
  @ValidateNested()
  @IsOptional()
  @Prop({ type: ShopSettingsSchema })
  settings: ShopSettings;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

ShopSchema.index({
  name: 'text',
  description: 'text',
});

ShopSchema.plugin(mongoosePaginate);
ShopSchema.plugin(mongooseAggregatePaginate);
