import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttachmentSchema = Attachment & Document;

@Schema()
export class Attachment {
  @Prop()
  thumbnail: string;

  @Prop()
  original: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
