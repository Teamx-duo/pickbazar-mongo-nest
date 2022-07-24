import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytic, AnalyticSchema } from './schemas/analytics.schema';
import {
  TotalYearSaleByMonth,
  TotalYearSaleByMonthSchema,
} from './schemas/totalYearSale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analytic.name, schema: AnalyticSchema },
    ]),
    MongooseModule.forFeature([
      { name: TotalYearSaleByMonth.name, schema: TotalYearSaleByMonthSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
