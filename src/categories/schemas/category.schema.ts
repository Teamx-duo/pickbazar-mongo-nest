import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Type } from 'src/types/schemas/type.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type CategorySchema = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsString()
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
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  details: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop()
  image: string;

  @IsString()
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

CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(mongooseAggregatePaginate);
