import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ShopSettings } from './shopSettings.schema';
import { Balance } from './balance.schema';
import { UserAddress } from 'src/addresses/schemas/userAddress.schema';
import { User } from 'src/users/schema/user.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import {
  IsArray,
  IsBoolean,
  isMongoId,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsOptional()
  @Prop(
    raw({
      admin_commission_rate: { type: Number },

      total_earnings: { type: Number },

      withdrawn_amount: { type: Number },

      current_balance: { type: Number },

      payment_info: {
        account: { type: String },

        name: { type: String },

        email: { type: String },

        bank: { type: String },
      },
    }),
  )
  balance: Record<string, any>;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  slug: string;

  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @IsString()
  @ApiProperty()
  @Prop({
    required: true,
  })
  cover_image: string;

  @IsString()
  @ApiProperty()
  @Prop({
    required: true,
  })
  logo: string;

  @ApiProperty()
  @IsOptional()
  @Prop(
    raw({
      street_address: { type: String },

      country: { type: String },

      city: { type: String },

      state: { type: String },

      zip: { type: String },
    }),
  )
  address: Record<string, any>;

  @ApiProperty()
  @IsOptional()
  @Prop(
    raw({
      socials: [
        {
          icon: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      contact: { type: String },
      location: { type: String },
      website: { type: String },
    }),
  )
  settings: Record<string, any>;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

ShopSchema.plugin(mongoosePaginate);
