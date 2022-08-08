import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import ordersJson from './orders.json';
import orderStatusJson from './order-statuses.json';
import { plainToClass } from 'class-transformer';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderStatus, OrderStatusSchema } from './schemas/orderStatus.schema';
import { paginate } from 'src/common/pagination/paginate';
import {
  GetOrderStatusesDto,
  OrderStatusPaginator,
} from './dto/get-order-statuses.dto';
import {
  CheckoutVerificationDto,
  VerifiedCheckoutData,
} from './dto/verify-checkout.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { ProductsService } from 'src/products/products.service';
import { ShopsService } from 'src/shops/shops.service';
import { Product } from 'src/products/schemas/product.schema';
import { CouponsService } from 'src/coupons/coupons.service';
import { CouponType } from 'src/coupons/schemas/coupon.shema';
import { TaxesService } from 'src/taxes/taxes.service';
import { Tax } from 'src/taxes/schemas/taxes.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: PaginateModel<OrderSchema>,
    @InjectModel(OrderStatus.name)
    private orderStatusModel: PaginateModel<OrderStatusSchema>,
    private readonly productServices: ProductsService,
    private readonly shopServices: ShopsService,
    private readonly couponServices: CouponsService,
    private readonly taxServices: TaxesService,
  ) {}
  async create(createOrderInput: CreateOrderDto, location?: any) {
    const { products, shop, coupon } = createOrderInput;
    const dbProducts: Product[] = await Promise.all([
      ...products.map((prod) => this.productServices.getProductById(prod)),
    ]);
    let total = dbProducts.reduce((acc, curr) => acc + curr.price, 0);
    const amount = total;
    let tax = 0;
    let taxes: Tax[];
    if (location && location['country']) {
      taxes = await this.taxServices.getAllTaxes({
        country: location['country'],
      });
    } else {
      taxes = await this.taxServices.getAllTaxes({ priority: 1, global: true });
    }
    if (taxes.length > 0) {
      tax = taxes[0].rate;
      total += (taxes[0].rate / 100) * total;
    }
    if (coupon) {
      const dbCoupon = await this.couponServices.getCoupon(coupon);
      if (dbCoupon.type === CouponType.FIXED_COUPON) {
        total -= dbCoupon.amount;
      }
      if (dbCoupon.type === CouponType.PERCENTAGE_COUPON) {
        total -= (dbCoupon.amount / 100) * total;
      }
    }
    const order = await this.orderModel.create({
      ...createOrderInput,
      total: total < 0 ? 0 : total,
      amount,
      sales_tax: tax,
    });
    await Promise.all([
      this.productServices.addOrder(products, order._id),
      this.shopServices.addOrder(shop, 1),
    ]);
    return order;
  }

  async getOrders({ limit, page, customer, id, search, shop }: GetOrdersDto) {
    const response = await this.orderModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
        ...(customer ? { customer } : {}),
        ...(shop ? { shop } : {}),
        ...(id ? { _id: id } : {}),
      },
      {
        limit,
        page,
        populate: [
          'shop',
          'coupon',
          'products',
          'billing_address',
          'shipping_address',
          'status',
        ],
      },
    );
    return PaginationResponse(response);
  }

  async getOrderById(id: string) {
    return await this.orderModel
      .findById(id)
      .populate([
        'shop',
        'coupon',
        'products',
        'status',
        'customer',
        'billing_address',
        'shipping_address',
      ]);
  }
  // getOrderByTrackingNumber(tracking_number: string): Order {
  //   const parentOrder = this.orders.find(
  //     (p) => p.tracking_number === tracking_number,
  //   );
  //   if (!parentOrder) {
  //     return this.orders[0];
  //   }
  //   return parentOrder;
  // }
  async getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
  }: GetOrderStatusesDto) {
    const response = await this.orderStatusModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      { limit, page, sort: { [orderBy]: 1 } },
    );
    return PaginationResponse(response);
  }
  async getOrderStatusById(id: string) {
    return await this.orderStatusModel.findById(id);
  }
  async update(id: string, updateOrderInput: UpdateOrderDto) {
    return await this.orderModel.findByIdAndUpdate(
      id,
      {
        $set: updateOrderInput,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndRemove(id, { new: true });
  }
  async verifyCheckout(input: CheckoutVerificationDto) {
    return input;
  }
  async createOrderStatus(createOrderStatusInput: CreateOrderStatusDto) {
    return await this.orderStatusModel.create(createOrderStatusInput);
  }
  async updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusDto,
  ) {
    return await this.orderStatusModel.findByIdAndUpdate(
      id,
      {
        $set: updateOrderStatusInput,
      },
      { new: true },
    );
  }
  async removeOrderStatus(id: string) {
    return await this.orderStatusModel.findByIdAndRemove(id, { new: true });
  }
}
