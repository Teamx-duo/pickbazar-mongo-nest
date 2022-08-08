import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export type OtpSchema = Otp & Document;

@Schema({ timestamps: true, expireAfterSeconds: 180 })
export class Otp {
  @IsString()
  @ApiProperty()
  phone_number: string;
  @IsString()
  @ApiProperty()
  code: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
