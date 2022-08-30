import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { Product } from 'src/products/schemas/product.schema';
import { Type } from 'src/types/schemas/type.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type TagSchema = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  @IsString()
  @ApiProperty()
  @MinLength(2)
  @MaxLength(50)
  @Prop({ required: true, unique: true })
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  @Prop({ required: true, unique: true })
  slug: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(500)
  @Prop()
  details: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  image: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop()
  icon: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  type: Type;

  @IsMongoId({ each: true })
  @IsArray()
  @ApiPropertyOptional()
  @IsOptional()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  products: Product[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.plugin(mongoosePaginate);
