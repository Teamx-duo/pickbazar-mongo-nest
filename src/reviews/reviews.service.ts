import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import {
  ProductPivot,
  ProductPivotSchema,
} from 'src/products/schemas/productPivot.schema';
import { Rating, RatingSchema } from 'src/products/schemas/rating.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewSchema } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: PaginateModel<ProductSchema>,
    @InjectModel(ProductPivot.name)
    private productPivotModel: PaginateModel<ProductPivotSchema>,
    @InjectModel(Review.name)
    private reviewModel: PaginateModel<ReviewSchema>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const existing = await this.reviewModel.find({
      product: createReviewDto.product,
      user: createReviewDto.user,
    });
    if (existing && existing.length > 0) {
      throw new HttpException('You have already given your review.', 400);
    }
    const updateProduct = await this.productModel.findById(
      createReviewDto.product,
    );
    updateProduct.rating_count = [
      ...updateProduct.rating_count,
      { rating: createReviewDto.rating, user: createReviewDto.user },
    ];
    updateProduct.ratings = updateProduct.ratings
      ? (updateProduct.ratings + createReviewDto.rating) / 2
      : createReviewDto.rating;
    await updateProduct.save();
    await this.productPivotModel.findByIdAndUpdate(
      createReviewDto.pivotId,
      { $set: { has_reviewed: true } },
      { new: true },
    );
    return await this.reviewModel.create(createReviewDto);
  }

  async findAll({
    comment,
    limit,
    orderBy,
    page,
    product,
    rating,
    shop,
    sortedBy,
    user,
  }: GetReviewsDto) {
    return await this.reviewModel.paginate(
      {
        ...(comment ? { comment: { $regex: comment, $options: 'i' } } : {}),
        ...(product ? { product } : {}),
        ...(rating ? { rating } : {}),
        ...(shop ? { shop } : {}),
        ...(user ? { user } : {}),
      },
      {
        page,
        limit,
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
        populate: [{ path: 'user' }, { path: 'shop' }, { path: 'product' }],
      },
    );
  }

  async findOne(id: string) {
    return await this.reviewModel.findById(id);
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return await this.reviewModel.findByIdAndUpdate(
      id,
      {
        $set: updateReviewDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.reviewModel.findByIdAndRemove(id, { new: true });
  }
}
