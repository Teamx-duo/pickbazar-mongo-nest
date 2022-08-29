import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { User } from './user.schema';

export type ProfileSchema = Profile & Document;

@Schema()
export class Profile {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  @Prop()
  avatar: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  @Prop()
  bio: string;

  @IsOptional()
  @Prop(
    raw({
      type: { type: String },
      link: { type: String },
    }),
  )
  socials: Record<string, any>[];

  @IsPhoneNumber(null, {
    message: 'Contact must be valid phone number. (eg: +92XXXXXXXXXX)',
  })
  @IsOptional()
  @Prop()
  contact: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
