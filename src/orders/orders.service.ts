import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto, OrderPaginator } from './dto/get-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import ordersJson from './orders.json';
import orderStatusJson from './order-statuses.json';
import { plainToClass } from 'class-transformer';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderStatus, OrderStatusSchema } from './schemas/orderStatus.schema';
import { GetOrderStatusesDto } from './dto/get-order-statuses.dto';
import { CheckoutVerificationDto } from './dto/verify-checkout.dto';
import {
  CreateOrderStatusDto,
  UpdateOrderStatusDto,
} from './dto/create-order-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { ProductsService } from 'src/products/products.service';
import { ShopsService } from 'src/shops/shops.service';
import { Product, ProductType } from 'src/products/schemas/product.schema';
import { CouponsService } from 'src/coupons/coupons.service';
import { CouponType } from 'src/coupons/schemas/coupon.shema';
import { TaxesService } from 'src/taxes/taxes.service';
import { Tax } from 'src/taxes/schemas/taxes.schema';
import {
  ProductPivot,
  ProductPivotSchema,
} from 'src/products/schemas/productPivot.schema';
import { removeDuplicates } from 'src/common/constants/common.function';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: PaginateModel<OrderSchema>,
    @InjectModel(OrderStatus.name)
    private orderStatusModel: PaginateModel<OrderStatusSchema>,
    @InjectModel(ProductPivot.name)
    private productPivotModel: PaginateModel<ProductPivotSchema>,
    private readonly productServices: ProductsService,
    private readonly shopServices: ShopsService,
    private readonly couponServices: CouponsService,
    private readonly taxServices: TaxesService,
  ) {}
  async create(createOrderInput: CreateOrderDto, location?: any) {
    const createOrderObj = { ...createOrderInput, products: [], shops: [] };
    const { products, shop, coupon } = createOrderInput;
    const status = await this.orderStatusModel.findOne({
      serial: 1,
    });
    if (!status) {
      throw new HttpException('Initial order status not found.', 500);
    }
    const dbProducts: (Product & { _id: Types.ObjectId })[] = await Promise.all(
      [
        ...products.map((prod: any) =>
          this.productServices.getProductById(prod.product_id),
        ),
      ],
    );
    const verifyProductPromises = dbProducts.map(
      (prod) =>
        new Promise(async (res, rej) => {
          const pivotProduct = products.find((p: any) =>
            prod._id.equals(p.product_id),
          );
          if (prod.product_type === ProductType.VARIABLE) {
            const productSelectedVariation = prod.variation_options.find(
              (variant: any) =>
                variant._id.equals(pivotProduct.variation_option_id),
            );
            if (
              pivotProduct.order_quantity > productSelectedVariation.quantity
            ) {
              rej(
                `${prod.name} is not available in the specified quantity anymore.`,
              );
              throw new HttpException(
                `${prod.name} is not available in the specified quantity anymore.`,
                400,
              );
            }
          }
          if (prod.product_type === ProductType.SIMPLE) {
            if (pivotProduct.order_quantity > prod.quantity) {
              rej(
                `${prod.name} is not available in the specified quantity anymore.`,
              );
              throw new HttpException(
                `${prod.name} is not available in the specified quantity anymore.`,
                400,
              );
            }
          }
          const pivot = await this.productPivotModel.create(pivotProduct);
          createOrderObj.products.push(pivot._id);
          const { _id: shopId }: any = prod.shop;
          createOrderObj.shops.push(shopId);
          res(pivot);
        }),
    );
    await Promise.all(verifyProductPromises);
    let total = dbProducts.reduce((acc, curr) => acc + curr.price, 0);
    let tax = 0;
    let taxes: Tax[];
    if (location && location['country']) {
      taxes = await this.taxServices.getAllTaxes({
        country: location['country'],
      });
    } else {
      taxes = await this.taxServices.getAllTaxes({ global: true });
    }
    if (taxes.length > 0) {
      tax = (taxes[0].rate / 100) * total;
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
      ...createOrderObj,
      total: isNaN(total) || total < 0 ? 0 : total,
      amount: isNaN(total) || total < 0 ? 0 : total,
      status: status._id,
      sales_tax: !isNaN(tax) ? tax : 0,
      shop: removeDuplicates(createOrderObj.shops),
    });
    await this.orderModel.populate(order, [
      { path: 'status' },
      { path: 'products' },
    ]);
    await Promise.all([
      this.productServices.addOrder(
        products.map((prod: any) => prod.product_id),
        order._id,
      ),
      this.shopServices.addOrderMultiple(order.shop, 1),
    ]);
    return order;
  }

  async getOrders({
    limit,
    page,
    customer,
    id,
    search,
    shop,
    sortedBy,
    orderBy,
  }: GetOrdersDto) {
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
          { path: 'shop' },
          { path: 'coupon' },
          { path: 'products', populate: { path: 'product_id' } },
          { path: 'billing_address' },
          { path: 'shipping_address' },
          { path: 'status' },
        ],
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return PaginationResponse(response);
  }

  async getOrderById(id: string) {
    return await this.orderModel
      .findById(id)
      .populate([
        { path: 'shop' },
        { path: 'coupon' },
        { path: 'products', populate: { path: 'product_id' } },
        { path: 'status' },
        { path: 'customer' },
        { path: 'billing_address' },
        { path: 'shipping_address' },
      ]);
  }
  async getOrderStatuses({
    limit,
    page,
    search,
    orderBy,
    sortedBy,
  }: GetOrderStatusesDto) {
    const response = await this.orderStatusModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {
        limit,
        page,
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
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
  async verifyCheckout(input: CheckoutVerificationDto, location?: any) {
    const verifiedCheckout = {
      ...input,
      unavailable_products: [],
      wallet_amount: 0,
      wallet_currency: 0,
      total_tax: 0,
      shipping_charge: 0,
      amount: 0,
    };
    const { products } = input;
    const dbProducts: any[] = await Promise.all([
      ...products.map((prod) =>
        this.productServices.getProductById(prod.product_id),
      ),
    ]);
    dbProducts.forEach((prod) => {
      const pivotProduct = products.find((p) => prod._id.equals(p.product_id));
      if (prod.product_type === ProductType.VARIABLE) {
        const productSelectedVariation = prod.variation_options.find(
          (variant: any) =>
            variant._id.equals(pivotProduct.variation_option_id),
        );
        if (pivotProduct.order_quantity > productSelectedVariation.quantity) {
          verifiedCheckout.unavailable_products.push(prod);
        }
      }
      if (prod.product_type === ProductType.SIMPLE) {
        if (pivotProduct.order_quantity > prod.quantity) {
          verifiedCheckout.unavailable_products.push(prod);
        }
      }
    });
    let total = dbProducts.reduce((acc, curr) => acc + curr.price, 0);
    const amount = total;
    let tax = 0;
    let taxes: Tax[];
    if (location && location['country']) {
      taxes = await this.taxServices.getAllTaxes({
        country: location['country'],
      });
    } else {
      taxes = await this.taxServices.getAllTaxes({ global: true });
    }
    if (taxes.length > 0) {
      tax = (taxes[0].rate / 100) * total;
      total += (taxes[0].rate / 100) * total;
    }
    verifiedCheckout.total_tax = tax;
    verifiedCheckout.amount = amount;
    return verifiedCheckout;
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
