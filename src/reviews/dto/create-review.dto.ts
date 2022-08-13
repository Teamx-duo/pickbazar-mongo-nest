import { PickType } from '@nestjs/swagger';
import { Review } from '../schemas/review.schema';

export class CreateReviewDto extends PickType(Review, [
  'comment',
  'my_feedback',
  'photos',
  'product',
  'rating',
  'shop',
  'user',
]) {}
