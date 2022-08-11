import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytic, AnalyticSchema } from './schemas/analytics.schema';
import {
  TotalYearSaleByMonth,
  TotalYearSaleByMonthSchema,
} from './schemas/totalYearSale.schema';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypesModule } from 'src/types/types.module';
import { OrdersModule } from 'src/orders/orders.module';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analytic.name, schema: AnalyticSchema },
    ]),
    MongooseModule.forFeature([
      { name: TotalYearSaleByMonth.name, schema: TotalYearSaleByMonthSchema },
    ]),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    TypesModule,
    OrdersModule,
    ShopsModule
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
