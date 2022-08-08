import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export type ConsentRegistrySchema = ConsentRegistry & Document;

@Schema({ timestamps: true })
export class ConsentRegistry {
  @IsString()
  @Prop()
  @ApiProperty()
  email: string;
  @IsArray()
  @Prop()
  @ApiProperty()
  registrationForm: any[];
  @IsString()
  @Prop()
  @ApiProperty()
  checkboxText: string;
  @IsDate()
  @Prop()
  @ApiProperty()
  date: Date;
  @IsString()
  @Prop()
  @ApiProperty()
  privacyPolicy: string;
  @IsString()
  @Prop()
  @ApiProperty()
  cookiePolicy: string;
  @IsString()
  @Prop()
  @ApiProperty()
  acceptedPolicy: string;
}

export const ConsentRegistrySchema =
  SchemaFactory.createForClass(ConsentRegistry);
