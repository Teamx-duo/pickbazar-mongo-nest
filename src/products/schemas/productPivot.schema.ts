import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';

export type ProductPivotSchema = ProductPivot & Document;

@Schema({ timestamps: true })
export class ProductPivot {
  @IsMongoId()
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product_id: mongoose.Schema.Types.ObjectId;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  @Prop({ default: false })
  has_reviewed: boolean;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  order_quantity: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  unit_price: number;

  @IsNumber()
  @ApiProperty()
  @Prop({ required: true })
  subtotal: number;

  @IsMongoId()
  @ApiProperty()
  @IsOptional()
  @Prop()
  variation_option_id: string;
}

export const ProductPivotSchema = SchemaFactory.createForClass(ProductPivot);
