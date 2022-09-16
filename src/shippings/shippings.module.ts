import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from './schemas/shipping.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shipping.name, schema: ShippingSchema },
    ]),
  ],
  controllers: [ShippingsController],
  providers: [ShippingsService],
})
export class ShippingsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ShippingsController);
  }
}
