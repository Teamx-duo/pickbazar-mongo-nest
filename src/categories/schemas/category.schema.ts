import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Type } from 'src/types/schemas/type.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type CategorySchema = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(150)
  @IsOptional()
  @ApiProperty()
  @Prop({ required: true, unique: true })
  slug: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parent?: mongoose.Schema.Types.ObjectId;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  children?: mongoose.Schema.Types.ObjectId[];

  @IsString()
  @MaxLength(2000)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  details: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  image: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  icon: string;

  @IsMongoId()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true })
  type: mongoose.Schema.Types.ObjectId;

  @IsMongoId({ each: true })
  @IsOptional()
  @IsArray()
  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products?: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ name: 'text' });
CategorySchema.index({ type: 1 });

CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(mongooseAggregatePaginate);
