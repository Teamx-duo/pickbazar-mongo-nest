import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Shop } from 'src/shops/schemas/shop.shema';
import { AttributeValue } from './attributeValue.schema';
import mongoosePaginate from 'mongoose-paginate-v2';

export type AttributeSchema = Attribute & Document;

@Schema({ timestamps: true })
export class Attribute {
  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsMongoId()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true })
  shop: Shop;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @Prop({ required: true })
  slug: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttributeValue' }],
  })
  values: AttributeValue[];
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);

AttributeSchema.index({ name: 'text', shop: 1 });

AttributeSchema.plugin(mongoosePaginate);
