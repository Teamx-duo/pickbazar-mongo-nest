import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypeSettingSchema = TypeSetting & Document;

@Schema()
export class TypeSetting {
  @Prop()
  isHome: string;

  @Prop()
  layoutType: string;

  @Prop()
  productCard: string;
}

export const TypeSettingSchema = SchemaFactory.createForClass(TypeSetting);
