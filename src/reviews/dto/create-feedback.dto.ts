import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Review } from '../schemas/review.schema';

export class CreateReviewFeebackDto extends PickType(Review, ['user']) {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  positive?: boolean;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  negative?: boolean;
}
