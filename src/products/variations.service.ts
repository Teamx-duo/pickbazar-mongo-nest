import { Injectable } from '@nestjs/common';
import { GetVariationsDto } from './dto/get-products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { Variation, VariationSchema } from './schemas/variation.schema';
import {
  CreateVariationDto,
  CreateVariationOptionDto,
  CreateVariationOptionsDto,
} from './dto/create-variation.dto';
import {
  UpdateVariationDto,
  UpdateVariationOptionDto,
} from './dto/update-variation.dto';
import {
  VariationOption,
  VariationOptionSchema,
} from './schemas/variationOption.schema';
import { PaginateModel } from 'mongoose';
@Injectable()
export class VariationsService {
  constructor(
    @InjectModel(Variation.name)
    private variationModel: PaginateModel<VariationSchema>,
    @InjectModel(VariationOption.name)
    private variationOptionModel: PaginateModel<VariationOptionSchema>,
  ) {}
  async create(createVariationDto: CreateVariationDto) {
    const variant = await this.variationModel.create(createVariationDto);
    return variant;
  }
  async createVariationOption(
    createVariationOptionDto: CreateVariationOptionDto,
  ) {
    const option = await this.variationOptionModel.create(
      createVariationOptionDto,
    );
    const variation = await this.variationModel
      .findOneAndUpdate(
        { _id: createVariationOptionDto.variation },
        {
          $push: { options: option._id },
        },
        { new: true },
      )
      .populate(['options', 'product']);
    return variation;
  }
  async createVariationOptions(
    createVariationOptionDto: CreateVariationOptionsDto,
  ) {
    const options: any = await this.variationOptionModel.insertMany(
      createVariationOptionDto.options.map((option) => ({
        ...option,
        variation: createVariationOptionDto.variation,
      })),
    );
    console.log(options);
    const variation = await this.variationModel
      .findOneAndUpdate(
        { _id: createVariationOptionDto.variation },
        {
          $push: { options: options.map((option) => option._id) },
        },
        { new: true },
      )
      .populate(['options', 'product']);
    return variation;
  }

  async getVariations({
    limit,
    page,
    search,
    orderBy,
    sortedBy,
    productId,
  }: GetVariationsDto) {
    const response = await this.variationModel.paginate(
      {
        ...(search ? { title: { $regex: search, $options: 'i' } } : {}),
        ...(productId ? { product: productId } : {}),
      },
      {
        limit,
        page,
        sort: { [sortedBy]: orderBy },
        populate: ['product', 'options'],
      },
    );
    return PaginationResponse(response);
  }

  async getVariationById(id: string) {
    return await this.variationModel
      .findById(id)
      .populate(['product', 'options']);
  }

  async getVariationOptionById(id: string) {
    return await this.variationOptionModel.findById(id).populate(['variation']);
  }

  async update(id: string, updateVariationDto: UpdateVariationDto) {
    return await this.variationModel
      .findByIdAndUpdate(id, { $set: updateVariationDto }, { new: true })
      .populate(['product', 'options']);
  }

  async updateMultiple(ids: string[], updateVariationDto: UpdateVariationDto) {
    return await this.variationModel
      .updateMany(
        {
          _id: { $in: ids },
        },
        { $set: updateVariationDto },
        { new: true },
      )
      .populate(['product', 'options']);
  }

  async updateVariationOption(
    id: string,
    updateVariationOptionDto: UpdateVariationOptionDto,
  ) {
    return await this.variationOptionModel
      .findByIdAndUpdate(id, { $set: updateVariationOptionDto }, { new: true })
      .populate(['product']);
  }

  async remove(id: string) {
    await this.variationOptionModel.deleteMany({ variation: id });
    return await this.variationModel.findByIdAndRemove(id, { new: true });
  }

  async removeVariationOption(id: string) {
    return await this.variationOptionModel.findByIdAndRemove(id, { new: true });
  }
}
