import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import Fuse from 'fuse.js';
import categoriesJson from './categories.json';
import { GetCategoriesAlongChildrenDto } from './dto/get-categories-along-children.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PaginateModel } from 'mongoose';
import { CategorySchema } from './schemas/category.schema';
import {
  Attachment,
  AttachmentSchema,
} from 'src/common/schemas/attachment.schema';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { convertToSlug } from 'src/common/constants/common.function';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { AggregatePaginateModel } from 'mongoose';

const categories = plainToClass(Category, categoriesJson);

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: PaginateModel<CategorySchema>,
    @InjectModel(Category.name)
    private categoryAggregateModel: AggregatePaginateModel<CategorySchema>,
  ) {}
  private categories: Category[] = categories;

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, details, type, parent, icon, image } = createCategoryDto;
    return this.categoryModel.create({
      slug: convertToSlug(name),
      name,
      details,
      type,
      parent,
      icon,
      image,
    });
  }

  async getCategoriesAll({ limit, page, search, type }: GetCategoriesDto) {
    const categories = await this.categoryModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
        ...(type ? { type } : {}),
      },
      { page, limit, populate: ['parent', 'type'] },
    );

    return PaginationResponse(categories);
  }

  async getCategories({
    limit,
    page,
    search,
    type,
    orderBy,
    sortedBy,
  }: GetCategoriesDto) {
    const aggregate = this.categoryAggregateModel.aggregate([
      {
        $match: {
          ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
          ...(type ? { type: new mongoose.Types.ObjectId(type) } : {}),
        },
      },
      {
        $sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 },
      },
      {
        $graphLookup: {
          from: 'categories',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'children',
        },
      },
      {
        $match: {
          parent: null,
        },
      },
    ]);
    const data = await this.categoryAggregateModel.aggregatePaginate(
      aggregate,
      { ...(limit ? { limit } : {}), ...(page ? { page } : {}) },
    );

    return data;
  }

  async getCategory(id: string) {
    return await this.categoryModel
      .findById(id)
      .populate(['image', 'parent', 'children', 'products', 'type']);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(
      id,
      {
        $set: updateCategoryDto,
      },
      { new: true },
    );
  }

  async updateMultiple(ids: string[], updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.updateMany(
      { _id: { $in: ids } },
      {
        $set: { updateCategoryDto },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndRemove(id, { new: true });
  }
}

// { search: 'type.slug:grocery', searchJoin: 'and', limit: '30' }
