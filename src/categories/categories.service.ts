import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import Fuse from 'fuse.js';
import categoriesJson from './categories.json';
// import { paginate } from 'src/common/pagination/paginate';
import { GetCategoriesAlongChildrenDto } from './dto/get-categories-along-children.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { CategorySchema } from './schemas/category.schema';
import {
  Attachment,
  AttachmentSchema,
} from 'src/common/schemas/attachment.schema';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { convertToSlug } from 'src/common/constants/common.function';
const categories = plainToClass(Category, categoriesJson);
const options = {
  keys: ['name', 'type.slug'],
  threshold: 0.3,
};
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: PaginateModel<CategorySchema>,
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

  async getCategories({ limit, page, search }: GetCategoriesDto) {
    const categories = await this.categoryModel.paginate(
      { ...(search ? { name: { $regex: search, $options: 'i' } } : {}) },
      { page, limit, populate: ['parent', 'type'] },
    );

    return PaginationResponse(categories);
  }

  async getCategory(id: string) {
    return await this.categoryModel
      .findById(id)
      .populate(['image', 'parent', 'children', 'products']);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(
      id,
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
