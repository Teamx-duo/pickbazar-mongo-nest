import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { ApproveWithdrawDto } from './dto/approve-withdraw.dto';
import { GetWithdrawsDto, WithdrawPaginator } from './dto/get-withdraw.dto';
import { paginate } from 'src/common/pagination/paginate';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { WithdrawSchema, Withdraw } from './schemas/withdraw.schema';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { Shop, ShopSchema } from 'src/shops/schemas/shop.shema';

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Shop.name)
    private shopModel: PaginateModel<ShopSchema>,
    @InjectModel(Withdraw.name)
    private withdrawModel: PaginateModel<WithdrawSchema>,
  ) {}

  async create(createWithdrawDto: CreateWithdrawDto) {
    if (createWithdrawDto.shop) {
      const shop = await this.shopModel.findById(createWithdrawDto.shop);
      if (!shop || !shop.is_active) {
        throw new HttpException(
          'Shop is not activated or not found.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return await this.withdrawModel.create(createWithdrawDto);
  }

  async getWithdraws({
    limit,
    page,
    status,
    shop_id,
    sortedBy,
    orderBy,
  }: GetWithdrawsDto) {
    const data = await this.withdrawModel.paginate(
      { ...(status ? { status } : {}), ...(shop_id ? { shop: shop_id } : {}) },
      {
        limit,
        page,
        populate: [{ path: 'shop' }],
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return PaginationResponse(data);
  }

  async findOne(id: string) {
    return await this.withdrawModel.findById(id).populate([{ path: 'shop' }]);
  }

  async update(id: string, updateWithdrawDto: ApproveWithdrawDto) {
    return await this.withdrawModel.findByIdAndUpdate(
      id,
      {
        $set: updateWithdrawDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.withdrawModel.findByIdAndRemove(id, { new: true });
  }
}
