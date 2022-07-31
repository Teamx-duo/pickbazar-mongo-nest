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
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: PaginateModel<ProductSchema>,
    @InjectModel(Tag.name)
    private tagModel: PaginateModel<TagSchema>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create({
      ...createProductDto,
      slug: convertToSlug(createProductDto.name),
    });
  }

  async getProducts({
    limit,
    page,
    search,
    orderBy,
    sortedBy,
  }: GetProductsDto) {
    const response = await this.productModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {
        limit,
        page,
        sort: { [sortedBy]: orderBy },
        populate: [
          { path: 'variations' },
          { path: 'variation_options' },
          { path: 'categories', select: '_id name image icon' },
          { path: 'tags', select: '_id name slug image icon' },
          { path: 'shop', select: '_id name' },
        ],
      },
    );
    return PaginationResponse(response);
  }

  async getProductBySlug(slug: string): Promise<Product> {
    return await this.productModel
      .findOne({ slug })
      .populate([
        'tags',
        'categories',
        'variations',
        'variation_options',
        'shop',
      ]);
  }

  async getPopularProducts({
    shop_id,
    limit,
    page,
  }: GetPopularProductsDto): Promise<Product[]> {
    const response = await this.productModel.paginate(
      {
        ...(shop_id ? { shop: shop_id } : {}),
      },
      { page, limit },
    );
    return PaginationResponse(response);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(
      id,
      {
        $set: updateProductDto,
      },
      { new: true },
    );
  }

  async addVariant(id: string, variant: any) {
    return await this.productModel.findByIdAndUpdate(
      id,
      {
        $push: { variations: variant },
      },
      { new: true },
    );
  }

  async addVariantOption(id: string, option: any) {
    return await this.productModel.findByIdAndUpdate(
      id,
      {
        $push: { variation_options: option },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndRemove(id, { new: true });
  }
}
