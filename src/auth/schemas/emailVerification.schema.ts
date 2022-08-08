import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export type EmailVerificationSchema = EmailVerification & Document;
@Schema({ timestamps: true })
export class EmailVerification {
  @IsString()
  @Prop()
  @ApiProperty()
  email: string;
  @IsString()
  @Prop()
  @ApiProperty()
  emailToken: string;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);
