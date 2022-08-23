import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type TaxesSchema = Tax & Document;

@Schema()
export class Tax {
  @IsString()
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @IsNumber()
  @Prop({ required: true, min: 0, max: 100 })
  rate: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Prop({ default: false })
  is_global: boolean;

  @IsString()
  @ApiProperty()
  @Prop()
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  state: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  zip: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop()
  city: string;

  @IsNumber()
  @ApiProperty()
  @Prop({ default: 1, unique: true })
  priority: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @Prop({ default: true })
  on_shipping: boolean = true;
}

export const TaxesSchema = SchemaFactory.createForClass(Tax);

TaxesSchema.plugin(mongoosePaginate);
