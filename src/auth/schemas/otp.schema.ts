import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export type OtpSchema = Otp & Document;

@Schema({ timestamps: true, expireAfterSeconds: 180 })
export class Otp {
  @IsString()
  phone_number: string;
  @IsString()
  code: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
