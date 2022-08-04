import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductSchema, ProductType } from './schemas/product.schema';
import { PaginateModel } from 'mongoose';
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
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: PaginateModel<ProductSchema>,
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
    const variantIds: any = createProductDto.variations;
    const dbProduct = await this.productModel.create({
      ...createProductDto,
      slug: convertToSlug(createProductDto.name),
    });
    await this.shopModel.findByIdAndUpdate(createProductDto.shop, {
      $inc: { products_count: 1 },
    });
    if (
      createProductDto.type === ProductType.VARIABLE &&
      createProductDto.variation_options &&
      createProductDto.variation_options?.upsert &&
      createProductDto.variation_options?.upsert?.length
    ) {
      const variations: any = await this.variationService.createMultiple(
        createProductDto.variation_options.upsert.map((option) => ({
          ...option,
          product: dbProduct._id,
        })),
      );
      dbProduct.variation_options = variations.map((variant) => variant._id);
    }
    if (createProductDto.variations) {
      dbProduct.variations = variantIds;
    }

    console.log(dbProduct);

    await dbProduct.save();
    return dbProduct;
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
          { path: 'type', select: '_id name' },
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

  async getProductById(id: string): Promise<Product> {
    return await this.productModel
      .findById(id)
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
    let variationOptions = [];
    if (
      updateProductDto.type === ProductType.VARIABLE &&
      updateProductDto.variation_options &&
      updateProductDto.variation_options?.upsert &&
      updateProductDto.variation_options?.upsert?.length
    ) {
      for (
        let i = 0;
        i < updateProductDto.variation_options.upsert?.length;
        i++
      ) {
        const var_option = updateProductDto.variation_options.upsert[i];
        let savedVarOption: any;
        if (var_option.id) {
          savedVarOption = await this.variationModel.findByIdAndUpdate(
            var_option.id,
            {
              $set: { ...var_option },
            },
          );
        } else {
          savedVarOption = await this.variationService.create({
            ...var_option,
          });
        }
        variationOptions.push(savedVarOption._id);
      }
    }
    return await this.productModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateProductDto,
          variation_options: variationOptions,
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
