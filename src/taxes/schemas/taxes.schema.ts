import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Max,
  Min,
} from 'class-validator';
import { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type TaxesSchema = Tax & Document;

@Schema({ timestamps: true })
export class Tax {
  @IsString()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(100)
  @Prop({ required: true })
  name: string;

  @ApiProperty({ minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  @Prop({ required: true, min: 0, max: 100 })
  rate: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Prop({ default: false })
  is_global: boolean;

  @IsString()
  @ApiProperty()
  @MaxLength(20)
  @Prop()
  country: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty()
  @Prop()
  state: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty()
  @Prop()
  zip: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
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
