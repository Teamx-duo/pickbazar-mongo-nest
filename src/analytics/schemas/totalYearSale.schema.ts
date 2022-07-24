import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Attachment } from 'src/common/schemas/attachment.schema';

export type TotalYearSaleByMonthSchema = TotalYearSaleByMonth & Document;

@Schema()
export class TotalYearSaleByMonth {
  @Prop()
  total: number;

  @Prop()
  month: string;
}

export const TotalYearSaleByMonthSchema =
  SchemaFactory.createForClass(TotalYearSaleByMonth);
