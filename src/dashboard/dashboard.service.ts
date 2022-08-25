import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { ProductsService } from 'src/products/products.service';
import { QueryShopsClassesOrderByColumn } from 'src/shops/dto/get-shops.dto';
import { ShopsService } from 'src/shops/shops.service';
import { GetDashboardDataDto } from './dto/get-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly categoryService: CategoriesService,
    private readonly productService: ProductsService,
    private readonly shopService: ShopsService,
  ) {}

  async getData({ limit, page = 1 }: GetDashboardDataDto) {
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
    const [categories, topRatedProducts, popularProducts, popularShops] =
      await Promise.all([
        getCategories(),
        getTopRatedProducts(),
        getPopularProducts(),
        getPopularShops(),
      ]);
    return {
      categories: categories?.docs,
      topRatedProducts: topRatedProducts?.docs,
      popularProducts: popularProducts?.docs,
      popularShops: popularShops?.docs,
    };
  }
}
