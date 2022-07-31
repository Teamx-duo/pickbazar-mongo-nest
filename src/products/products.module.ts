import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
  VariationsController,
} from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { Tag, TagSchema } from 'src/tags/schemas/tag.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';
import { Variation, VariationSchema } from './schemas/variation.schema';
import {
  VariationOption,
  VariationOptionSchema,
} from './schemas/variationOption.schema';
import { VariationsService } from './variations.service';
import { TagsModule } from 'src/tags/tags.module';
import { Model } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: VariationOption.name, schema: VariationOptionSchema },
      { name: Variation.name, schema: VariationSchema },
    ]),
    TagsModule,
  ],
  controllers: [
    ProductsController,
    PopularProductsController,
    VariationsController,
  ],
  providers: [ProductsService, VariationsService],
  exports: [ProductsService, VariationsService, MongooseModule],
})
export class ProductsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(ProductsController);
  }
}
