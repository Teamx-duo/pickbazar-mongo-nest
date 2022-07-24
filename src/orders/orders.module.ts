import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController, OrderStatusController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderStatus, OrderStatusSchema } from './schemas/orderStatus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: OrderStatus.name, schema: OrderStatusSchema },
    ]),
  ],
  controllers: [OrdersController, OrderStatusController],
  providers: [OrdersService],
})
export class OrdersModule {}
