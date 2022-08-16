import { PickType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Review } from '../schemas/review.schema';

export class CreateReviewDto extends PickType(Review, [
  'comment',
  'my_feedback',
  'photos',
  'product',
  'rating',
  'shop',
  'user',
]) {
  @IsMongoId()
  pivotId: string;
}
