import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';
import { User } from './user.schema';

export type ProfileSchema = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  avatar: Attachment;

  @Prop()
  bio: boolean;

  @Prop(
    raw({
      type: { type: String },
      link: { type: String },
    }),
  )
  socials: Record<string, any>[];

  @Prop()
  contact: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
