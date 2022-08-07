import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { User } from './user.schema';

export type ProfileSchema = Profile & Document;

@Schema()
export class Profile {
  @IsString()
  @IsOptional()
  @Prop()
  avatar: string;

  @IsString()
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

  @IsString()
  @IsOptional()
  @Prop()
  contact: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
