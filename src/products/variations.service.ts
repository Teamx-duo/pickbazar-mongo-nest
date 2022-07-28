import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductSchema } from './schemas/product.schema';
import { PaginateModel } from 'mongoose';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { Tag, TagSchema } from 'src/tags/schemas/tag.schema';
import { convertToSlug } from 'src/common/constants/common.function';
import { Variation, VariationSchema } from './schemas/variation.schema';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Variation.name)
    private variationModel: PaginateModel<VariationSchema>,
  ) {}
  async create(createVariationDto: CreateProductDto) {
    await this.variationModel.create(createVariationDto);
  }

  async getProducts({
    limit,
    page,
    search,
    orderBy,
    sortedBy,
  }: GetProductsDto) {}

  async getProductBySlug(slug: string) {}
  async update(id: string, updateProductDto: UpdateProductDto) {}

  async remove(id: string) {}
}
