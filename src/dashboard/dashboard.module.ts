import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ShopsModule } from 'src/shops/shops.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Dashboard, DashboardSchema } from './schemas/dashboard.schema';
import { Banner, BannerSchema } from 'src/types/schemas/banner.schema';
import { TypesModule } from 'src/types/types.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Banner.name, schema: BannerSchema },
      { name: Dashboard.name, schema: DashboardSchema },
    ]),
    TypesModule,
    ProductsModule,
    CategoriesModule,
    ShopsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
