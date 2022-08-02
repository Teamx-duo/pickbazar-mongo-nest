import { ShopSchema, Shop } from './schemas/shop.shema';
import mongoose, { ObjectId, PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ApproveShopDto, CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { Balance, BalanceSchema } from './schemas/balance.schema';
import {
  ShopSettings,
  ShopSettingsSchema,
} from './schemas/shopSettings.schema';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PaymentInfoSchema, PaymentInfo } from './schemas/paymentInfo.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateShopSettingDto } from './dto/create-shopsettings.dto';
import { UpdateShopSettingDto } from './dto/update-shopsettings.dto';
import { convertToSlug } from 'src/common/constants/common.function';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/constants/roles.enum';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name)
    private shopModel: PaginateModel<ShopSchema>,
    @InjectModel(Balance.name)
    private balanceModel: PaginateModel<BalanceSchema>,
    @InjectModel(ShopSettings.name)
    private settingsModel: PaginateModel<ShopSettingsSchema>,
    @InjectModel(PaymentInfo.name)
    private paymentModel: PaginateModel<PaymentInfoSchema>,
    private readonly userService: UsersService,
  ) {}

  async create(createShopDto: CreateShopDto, user: any) {
    const shop = await this.shopModel.create({
      ...createShopDto,
      slug: convertToSlug(createShopDto.name),
    });
    const balance = await this.createBalance({
      shop: shop._id,
      admin_commission_rate: 2,
    });
    const settings = await this.createShopSettings({ shop: shop._id });
    const savedShop = await this.shopModel
      .findByIdAndUpdate(
        shop._id,
        { $set: { balance: balance._id, settings: settings._id } },
        { new: true },
      )
      .populate(['settings', 'owner'])
      .populate({
        path: 'balance',
        populate: {
          path: 'payment_info',
          model: 'PaymentInfo',
        },
      });
    if (!user.roles.includes(Role.STORE_OWNER)) {
      await this.userService.addUserPermission(createShopDto.owner, {
        permissions: Role.STORE_OWNER,
      });
    }
    await this.userService.addUserShop(createShopDto.owner, shop._id);
    return savedShop;
  }

  async getShops({ search, limit, page }: GetShopsDto) {
    const responses = await this.shopModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      { limit, page },
    );
    return PaginationResponse(responses);
  }
  async getStaffs({ shop_id }: GetStaffsDto) {
    const shop = await this.shopModel.findById(shop_id).populate(['staffs']);
    return shop.staffs;
  }

  async getShop(slug: string): Promise<Shop> {
    return await this.shopModel.findOne({ slug });
  }

  async update(id: string, updateShopDto: UpdateShopDto) {
    return await this.shopModel.findByIdAndUpdate(
      id,
      { $set: updateShopDto },
      { new: true },
    );
  }

  async updateMultiple(ids: string, updateShopDto: UpdateShopDto) {
    return await this.shopModel.updateMany(
      { _id: { $in: ids } },
      { $set: updateShopDto },
      { new: true },
    );
  }

  async approve({ id, admin_commission_rate }: ApproveShopDto) {
    await this.balanceModel.findOneAndUpdate(
      { shop: id },
      { $set: { admin_commission_rate } },
    );
    return await this.shopModel.findByIdAndUpdate(
      id,
      {
        $set: { is_active: true },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.shopModel.findByIdAndRemove(id, { new: true });
  }

  async createBalance(createBalanceDto: CreateBalanceDto) {
    const paymentInfo = await this.createPaymentInfo({
      shop: createBalanceDto.shop,
    });
    return await this.balanceModel.create({
      ...createBalanceDto,
      payment_info: paymentInfo._id,
    });
  }

  async updateBalance(id: string, updateBalanceDto: UpdateBalanceDto) {
    return await this.balanceModel.findByIdAndUpdate(updateBalanceDto, {
      $set: updateBalanceDto,
    });
  }

  async addOrder(id: ObjectId, ordersCount: number) {
    return await this.shopModel.findByIdAndUpdate(
      id,
      {
        $inc: { orders_count: ordersCount },
      },
      { new: true },
    );
  }

  async createPaymentInfo(createPaymentDto: CreatePaymentDto) {
    return await this.paymentModel.create(createPaymentDto);
  }

  async createShopSettings(createSettingDto: CreateShopSettingDto) {
    return await this.settingsModel.create(createSettingDto);
  }

  async updateShopSettings(
    id: string,
    updateShopSettingDto: UpdateShopSettingDto,
  ) {
    return await this.settingsModel.findByIdAndUpdate(
      id,
      {
        $set: updateShopSettingDto,
      },
      { new: true },
    );
  }

  async updatePaymentInfo(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentModel.findByIdAndUpdate(
      id,
      {
        $set: updatePaymentDto,
      },
      { new: true },
    );
  }
}
