import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { ProductsService } from 'src/products/products.service';
import { QueryShopsClassesOrderByColumn } from 'src/shops/dto/get-shops.dto';
import { ShopsService } from 'src/shops/shops.service';
import { CreateUpdateDashboardDto } from './dto/create-dashboard.dto';
import { GetDashboardDataDto } from './dto/get-dashboard.dto';
import { Dashboard, DashboardSchema } from './schemas/dashboard.schema';

@Injectable()
export class DashboardService {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly productService: ProductsService,
    private readonly shopService: ShopsService,
    @InjectModel(Dashboard.name)
    private dashboardModel: Model<DashboardSchema>,
  ) {}

  async getData({ limit, page = 1 }: GetDashboardDataDto) {
    const getDashboard = () => this.dashboardModel.find({});
    const getCategories = () =>
      this.categoryService.getCategories({ limit, page });
    const getTopRatedProducts = () =>
      this.productService.getPopularProducts({
        limit,
        page,
      });
    const getPopularProducts = () =>
      this.productService.getPopularProducts({
        limit,
        page,
      });
    const getPopularShops = () =>
      this.shopService.getShops({
        limit,
        page,
        orderBy: QueryShopsClassesOrderByColumn.ORDERS,
        sortedBy: SortOrder.DESC,
      });
    const [
      dashboard,
      categories,
      topRatedProducts,
      popularProducts,
      popularShops,
    ] = await Promise.all([
      getDashboard(),
      getCategories(),
      getTopRatedProducts(),
      getPopularProducts(),
      getPopularShops(),
    ]);
    return {
      dashboard: dashboard && dashboard?.[0] ? dashboard?.[0] : {},
      categories: categories?.docs,
      topRatedProducts: topRatedProducts?.docs,
      popularProducts: popularProducts?.docs,
      popularShops: popularShops?.docs,
    };
  }

  async createUpdateDashboard(createUpdateDashboard: CreateUpdateDashboardDto) {
    const dashboard = await this.dashboardModel.find({});
    if (dashboard && dashboard?.[0]) {
      return await this.dashboardModel.findByIdAndUpdate(
        dashboard?.[0]?._id,
        { $set: createUpdateDashboard },
        { new: true },
      );
    }
    return await this.dashboardModel.create(createUpdateDashboard);
  }
}
