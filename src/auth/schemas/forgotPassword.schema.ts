import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export type ForgottenPasswordSchema = ForgottenPassword & Document;

@Schema({ timestamps: true })
export class ForgottenPassword {
  @IsString()
  @Prop()
  @ApiProperty()
  email: string;
  @IsString()
  @Prop()
  @ApiProperty()
  newPasswordToken: string;
}

export const ForgottenPasswordSchema =
  SchemaFactory.createForClass(ForgottenPassword);
