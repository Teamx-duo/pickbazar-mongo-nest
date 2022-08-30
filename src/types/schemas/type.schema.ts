import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Banner } from './banner.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export type TypeSchema = Type & Document;

@Schema({ timestamps: true })
export class Type {
  @IsString()
  @Prop({ required: true, unique: true })
  name: string;

  @IsString()
  @Prop({ required: true, unique: true })
  slug: string;

  @IsString()
  @Prop()
  image: string;

  @IsString()
  @Prop({ required: true })
  icon: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Banner' }] })
  banners: Banner[];

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  @Prop()
  promotional_sliders: string[];

  @ValidateNested()
  @Prop(
    raw({
      isHome: { type: Boolean },
      layoutType: { type: String },
      productCard: { type: String },
    }),
  )
  settings: Record<string, any>;
}

export const TypeSchema = SchemaFactory.createForClass(Type);

TypeSchema.plugin(mongoosePaginate);
