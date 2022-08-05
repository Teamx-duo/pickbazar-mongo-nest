import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { SettingsOptions } from './settingOptions.schema';

export type SettingSchema = Setting & Document;

@Schema()
export class Setting {
  @IsOptional()
  @ApiProperty()
  @Prop(
    raw({
      siteTitle: { type: String },

      siteSubtitle: { type: String },

      currency: { type: String },

      minimumOrderAmount: { type: Number },

      deliveryTime: [{ title: String }, { description: String }],

      logo: { type: String },

      taxClass: { type: String },

      shippingClass: { type: String },

      google: { isEnable: { type: Boolean }, tagManagerId: { type: String } },

      facebook: {
        isEnable: { type: Boolean },
        appId: { type: String },
        pageId: { type: String },
      },
      contactDetails: {
        socials: [
          {
            icon: { type: String },
            shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
            url: { type: String },
          },
        ],
        contact: { type: String },
        location: {
          lat: { type: String },
          lng: { type: String },
          city: { type: String },
          state: { type: String },
          country: { type: String },
          zip: { type: String },
          formattedAddress: { type: String },
        },
        website: { type: String },
      },
    }),
  )
  options: SettingsOptions;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
