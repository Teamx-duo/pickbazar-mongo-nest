import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import {
  ProductsController,
  PopularProductsController,
} from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { Tag, TagSchema } from 'src/tags/schemas/tag.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';
import { Variation, VariationSchema } from './schemas/variation.schema';
import {
  VariationOption,
  VariationOptionSchema,
} from './schemas/variationOption.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Variation.name, schema: VariationSchema },
      { name: VariationOption.name, schema: VariationOptionSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  controllers: [ProductsController, PopularProductsController],
  providers: [ProductsService],
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
