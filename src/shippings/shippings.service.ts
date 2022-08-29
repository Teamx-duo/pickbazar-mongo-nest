import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { GetShippingsDto } from './dto/get-shippings.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ShippingSchema, Shipping } from './schemas/shipping.schema';
@Injectable()
export class ShippingsService {
  constructor(
    @InjectModel(Shipping.name)
    private shippingModel: PaginateModel<ShippingSchema>,
  ) {}

  async create(createShippingDto: CreateShippingDto) {
    return await this.shippingModel.create(createShippingDto);
  }

  async getShippings({ text, orderBy, sortedBy }: GetShippingsDto) {
    return await this.shippingModel.find(
      {
        ...(text ? { name: { $regex: text, $options: 'i' } } : {}),
      },
      {},
      {
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
  }

  async findOne(id: string) {
    return await this.shippingModel.findById(id);
  }

  async update(id: string, updateShippingDto: UpdateShippingDto) {
    return await this.shippingModel.findByIdAndUpdate(
      id,
      {
        $set: updateShippingDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.shippingModel.findByIdAndRemove(id, { new: true });
  }
}
