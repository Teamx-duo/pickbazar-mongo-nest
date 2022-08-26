import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import {
  ProductPivot,
  ProductPivotSchema,
} from 'src/products/schemas/productPivot.schema';
import { Rating, RatingSchema } from 'src/products/schemas/rating.schema';
import { CreateReviewFeebackDto } from './dto/create-feedback.dto';
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

  async addFeedBack(id: string, createFeedbackDto: CreateReviewFeebackDto) {
    const { positive, negative, user } = createFeedbackDto;
    const exists: any = await this.reviewModel.findOne({
      feedbacks: { $elemMatch: { user } },
    });
    if (exists) {
      const feed = exists.feedbacks.find((feed) => feed.user?.equals(user));
      if (feed.positive === positive || feed.negative === negative) {
        throw new HttpException(
          'Your response has already been recorded',
          HttpStatus.BAD_REQUEST,
        );
      }
      const feedback = await this.reviewModel.findOneAndUpdate(
        {
          feedbacks: { $elemMatch: { user } },
        },
        {
          $set: {
            ...(positive
              ? {
                  'feedbacks.$.positive': true,
                  'feedbacks.$.negative': false,
                }
              : {
                  'feedbacks.$.positive': false,
                  'feedbacks.$.negative': true,
                }),
          },
          $inc: {
            positive_feedbacks_count: positive ? 1 : -1,
            negative_feedbacks_count: negative ? 1 : -1,
          },
        },
        { new: true },
      );
      return feedback;
    }
    return await this.reviewModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          ...(positive ? { positive_feedbacks_count: 1 } : {}),
          ...(negative ? { negative_feedbacks_count: 1 } : {}),
        },
        $push: {
          feedbacks: {
            positive,
            negative,
            user,
          },
        },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.reviewModel.findByIdAndRemove(id, { new: true });
  }
}
