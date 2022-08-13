import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewSchema } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: PaginateModel<ReviewSchema>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
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
          [orderBy]: sortedBy,
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
