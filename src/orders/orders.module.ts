import { Module } from '@nestjs/common';
import { NestModule, MiddlewareConsumer } from '@nestjs/common/interfaces';
import { OrdersService } from './orders.service';
import { OrdersController, OrderStatusController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderStatus, OrderStatusSchema } from './schemas/orderStatus.schema';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { ShopsModule } from 'src/shops/shops.module';
import { AttributesModule } from 'src/attributes/attributes.module';
import { CouponsModule } from 'src/coupons/coupons.module';
import { TaxesModule } from 'src/taxes/taxes.module';
import { SettingsModule } from 'src/settings/settings.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderStatus.name, schema: OrderStatusSchema },
    ]),
    ProductsModule,
    CategoriesModule,
    ShopsModule,
    AttributesModule,
    CouponsModule,
    TaxesModule,
    SettingsModule,
    NotificationsModule,
  ],
  controllers: [OrdersController, OrderStatusController],
  providers: [OrdersService],
  exports: [OrdersService, MongooseModule],
})
export class OrdersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(OrdersController);
  }
}
