import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { CreateTaxDto } from './dto/create-tax.dto';
import { GetTaxesDto } from './dto/get-taxes.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax, TaxesSchema } from './schemas/taxes.schema';
@Injectable()
export class TaxesService {
  constructor(
    @InjectModel(Tax.name)
    private taxesModel: PaginateModel<TaxesSchema>,
  ) {}

  async create(createTaxDto: CreateTaxDto) {
    console.log(createTaxDto);
    return await this.taxesModel.create(createTaxDto);
  }

  async findAll({
    text,
    orderBy,
    sortedBy,
    country,
    priority,
    global,
  }: GetTaxesDto) {
    const response = await this.taxesModel.paginate(
      {
        ...(text ? { name: { $regex: text, $options: 'i' } } : {}),
        ...(country ? { country } : {}),
        ...(priority ? { priority } : {}),
        ...(global !== null || global !== undefined ? { global } : {}),
      },
      { sort: { [orderBy]: sortedBy } },
    );
    return PaginationResponse(response);
  }

  async getAllTaxes({ text, country, priority }: GetTaxesDto) {
    return await this.taxesModel.find({
      ...(text ? { name: { $regex: text, $options: 'i' } } : {}),
      ...(country ? { country } : {}),
      ...(priority ? { priority } : {}),
      ...(priority ? { priority } : {}),
    });
  }

  async findOne(id: string | ObjectId) {
    return await this.taxesModel.findById(id);
  }

  async update(id: string | ObjectId, updateTaxDto: UpdateTaxDto) {
    return await this.taxesModel.findByIdAndUpdate(
      id,
      { $set: updateTaxDto },
      { new: true },
    );
  }

  async remove(id: string | ObjectId) {
    return await this.taxesModel.findByIdAndRemove(id, { new: true });
  }
}
