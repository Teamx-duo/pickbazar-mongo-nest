import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { GetOrderStatusesDto } from './dto/get-order-statuses.dto';
import { CheckoutVerificationDto } from './dto/verify-checkout.dto';
import { Request } from 'express';
import { lookup } from 'geoip-lite';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(ip);
    return this.ordersService.create(createOrderDto, lookup(ip.toString()));
  }

  @Get()
  async getOrders(@Query() query: GetOrdersDto): Promise<OrderPaginator> {
    return this.ordersService.getOrders(query);
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
  // @Get('tracking-number/:tracking_id')
  // getOrderByTrackingNumber(@Param('tracking_id') tracking_id: string) {
  //   return this.ordersService.getOrderByTrackingNumber(tracking_id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Post('checkout/verify')
  verifyCheckout(@Query() query: CheckoutVerificationDto) {
    return this.ordersService.verifyCheckout(query);
  }
}

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  create(@Body() createOrderStatusDto: CreateOrderStatusDto) {
    return this.ordersService.createOrderStatus(createOrderStatusDto);
  }

  @Get()
  findAll(@Query() query: GetOrderStatusesDto) {
    return this.ordersService.getOrderStatuses(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.getOrderStatusById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.removeOrderStatus(id);
  }
}
