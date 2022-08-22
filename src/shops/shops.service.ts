import { ShopSchema, Shop } from './schemas/shop.shema';
import mongoose, { Model, ObjectId, PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  ApproveShopDto,
  CreateShopDto,
  DisApproveDto,
} from './dto/create-shop.dto';
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
import { User, UserSchema } from 'src/users/schema/user.schema';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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
    @InjectModel(User.name) private userModel: Model<UserSchema>,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async create(createShopDto: CreateShopDto, user: any) {
    const shop = await this.shopModel.create({
      ...createShopDto,
      slug: convertToSlug(createShopDto.name),
    });
    if (!user.roles.includes(Role.STORE_OWNER)) {
      await this.userService.addUserPermission(createShopDto.owner, {
        permissions: Role.STORE_OWNER,
      });
    }
    await this.userService.addUserShop(createShopDto.owner, shop._id);
    return shop;
  }

  async createShopStaff(createStaffDto: CreateUserDto, shopUser: any) {
    const user = await this.userService.createStaff({
      ...createStaffDto,
      shop: createStaffDto.shop,
      shops: [createStaffDto.shop],
      roles: [Role.STAFF],
    });
    await this.shopModel.findByIdAndUpdate(createStaffDto.shop, {
      $push: { staffs: user._id },
    });
    await this.mailService.sendStaffLoginCredentials({
      ...user,
      password: createStaffDto.password,
    });
    return user;
  }

  async getShops({ search, limit, page, orderBy, sortedBy }: GetShopsDto) {
    const responses = await this.shopModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {
        limit,
        page,
        populate: ['owner'],
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return PaginationResponse(responses);
  }

  async getStaffs({ shop_id, orderBy, sortedBy }: GetStaffsDto) {
    const staff = await this.userModel.find(
      {
        $or: [{ shops: shop_id }, { shop: shop_id }],
        roles: Role.STAFF,
      },
      {
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return staff;
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

  async updateStaff(id: string, updateStaffDto: UpdateUserDto) {
    return await this.userService.update(id, updateStaffDto);
  }

  async updateMultiple(ids: string, updateShopDto: UpdateShopDto) {
    return await this.shopModel.updateMany(
      { _id: { $in: ids } },
      { $set: updateShopDto },
      { new: true },
    );
  }

  async approve({ id, admin_commission_rate }: ApproveShopDto) {
    return await this.shopModel.findByIdAndUpdate(
      id,
      {
        $set: {
          is_active: true,
          'balance.admin_commission_rate': admin_commission_rate,
        },
      },
      { new: true },
    );
  }

  async disApprove({ id }: DisApproveDto) {
    return await this.shopModel.findByIdAndUpdate(
      id,
      {
        $set: { is_active: false },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.shopModel.findByIdAndRemove(id, { new: true });
  }

  async removeStaff(id: string) {
    return await this.userService.remove(id);
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

  async addOrderMultiple(ids: any[], amount: any) {
    return await this.shopModel.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $push: { orders: amount },
      },
      { new: true },
    );
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
