import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import {
  GetProductsDto,
  QueryProductsOrderByColumn,
} from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductSchema, ProductType } from './schemas/product.schema';
import mongoose, {
  AggregatePaginateModel,
  PaginateModel,
  Types,
} from 'mongoose';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { Tag, TagSchema } from 'src/tags/schemas/tag.schema';
import { convertToSlug } from 'src/common/constants/common.function';
import { Shop, ShopSchema } from 'src/shops/schemas/shop.shema';
import { Variation, VariationSchema } from './schemas/variation.schema';
import {
  VariationOption,
  VariationOptionSchema,
} from './schemas/variationOption.schema';
import { VariationsService } from './variations.service';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: PaginateModel<ProductSchema>,
    @InjectModel(Product.name)
    private productAggragateModel: AggregatePaginateModel<ProductSchema>,
    @InjectModel(Tag.name)
    private tagModel: PaginateModel<TagSchema>,
    @InjectModel(Variation.name)
    private variationModel: PaginateModel<VariationSchema>,
    @InjectModel(VariationOption.name)
    private variationOptionModel: PaginateModel<VariationOptionSchema>,
    @InjectModel(Shop.name)
    private shopModel: PaginateModel<ShopSchema>,
    private readonly variationService: VariationsService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    if (createProductDto.shop) {
      const shop = await this.shopModel.findById(createProductDto.shop);
      if (!shop || !shop.is_active) {
        throw new HttpException(
          'Shop is not activated or not found.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const createObj = {
      ...createProductDto,
      variation_options: createProductDto.variation_options.upsert,
    };
    const dbProduct = await this.productModel.create({
      ...createObj,
      slug: convertToSlug(createProductDto.name),
    });
    await this.shopModel.findByIdAndUpdate(createObj.shop, {
      $inc: { products_count: 1 },
    });
    return dbProduct;
  }

  async getProducts({
    limit,
    page,
    search,
    orderBy,
    shop,
    sortedBy,
    category,
    type,
  }: GetProductsDto) {
    const response = await this.productModel.paginate(
      {
        ...(search ? { $text: { $search: search } } : {}),
        ...(shop ? { shop: shop } : {}),
        ...(type ? { type } : {}),
        ...(category
          ? {
              categories: category,
            }
          : {}),
      },
      {
        limit,
        page,
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
        populate: [
          { path: 'variations' },
          { path: 'variation_options' },
          { path: 'categories' },
          { path: 'tags' },
          { path: 'shop' },
          { path: 'type' },
        ],
      },
    );
    return PaginationResponse(response);
  }

  async getProductBySlug(slug: string): Promise<Product> {
    return await this.productModel.findOne({ slug }).populate([
      { path: 'tags' },
      { path: 'categories' },
      {
        path: 'variations',
        populate: {
          path: 'attribute',
        },
      },
      { path: 'variation_options' },
      { path: 'shop' },
      { path: 'type' },
    ]);
  }

  async findProduct(searchObj: any): Promise<Product> {
    return await this.productModel.findOne(searchObj).populate([
      { path: 'tags' },
      { path: 'categories' },
      {
        path: 'variations',
        populate: {
          path: 'attribute',
        },
      },
      { path: 'variation_options' },
      { path: 'shop' },
      { path: 'type' },
    ]);
  }

  async getShopProducts(shopId: string, { page, limit }: GetProductsDto) {
    const aggregate = this.productModel.aggregate([
      { $sort: { createdAt: 1 } },
      {
        $match: {
          $and: [{ shop: new Types.ObjectId(shopId) }],
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $group: {
          _id: '$category',
          products: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          _id: 0,
          category: {
            $arrayElemAt: ['$_id', 0],
          },
          products: {
            $map: {
              input: '$products',
              in: {
                $mergeObjects: [
                  '$$this',
                  {
                    category: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: '$cat',
                            as: 'c',
                            cond: {
                              $eq: ['$$c._id', '$$this.category'],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    const data = await this.productAggragateModel.aggregatePaginate(aggregate, {
      ...(limit ? { limit } : {}),
      ...(page ? { page } : {}),
    });
    return PaginationResponse(data);
  }

  async getProductById(id: string) {
    return await this.productModel.findById(id).populate([
      { path: 'tags' },
      { path: 'categories' },
      {
        path: 'variations',
        populate: {
          path: 'attribute',
          model: 'Attribute',
        },
      },
      { path: 'variation_options' },
      { path: 'shop' },
      { path: 'type' },
    ]);
  }

  async getPopularProducts(filters: GetPopularProductsDto) {
    return await this.getProducts({
      orderBy: QueryProductsOrderByColumn.ORDERS,
      sortedBy: SortOrder.DESC,
      ...filters,
    });
  }

  async getTopRatedProducts(filters: GetPopularProductsDto) {
    return await this.getProducts({
      orderBy: QueryProductsOrderByColumn.RATING,
      sortedBy: SortOrder.DESC,
      ...filters,
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const addVariationObjects: any = updateProductDto.variation_options.upsert;
    delete updateProductDto.variation_options;
    return await this.productModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateProductDto,
          variation_options: addVariationObjects,
        },
      },
      { new: true },
    );
  }

  async updateMultiple(ids: string[], updateProductDto: UpdateProductDto) {
    return await this.productModel.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $set: updateProductDto,
      },
      { new: true },
    );
  }

  async addOrder(ids: string[], amount: any) {
    return await this.productModel.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $push: { orders: amount },
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
