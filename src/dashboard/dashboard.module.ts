import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [ProductsModule, CategoriesModule, ShopsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
