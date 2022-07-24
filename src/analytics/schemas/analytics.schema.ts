import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TotalYearSaleByMonth } from './totalYearSale.schema';

export type AnalyticSchema = Analytic & Document;

@Schema()
export class Analytic {
  @Prop()
  totalRevenue: number;

  @Prop()
  totalShops: number;

  @Prop()
  todaysRevenue: number;

  @Prop()
  totalOrders: number;

  @Prop()
  newCustomers: number;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'TotalYearSaleByMonth' },
    ],
  })
  totalYearSaleByMonth: TotalYearSaleByMonth[];
}

export const AnalyticSchema = SchemaFactory.createForClass(Analytic);
