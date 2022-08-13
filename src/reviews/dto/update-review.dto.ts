import { OmitType, PartialType } from '@nestjs/swagger';
import { Review } from '../schemas/review.schema';

export class UpdateReviewDto extends PartialType(
  OmitType(Review, ['user', 'product', 'shop']),
) {}
