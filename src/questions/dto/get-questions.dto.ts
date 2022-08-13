import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'src/common/dto/generic-conditions.dto';
import { CreateQuestionDto } from './create-question.dto';

export enum QueryCategoriesOrderByColumn {
  CREATED_AT = 'createdAt',
  QUESTION = 'question',
  NEGATIVE_FEEDBACK = 'negative_feedbacks_count',
  POSITIVE_FEEDBACK = 'positive_feedbacks_count',
  UPDATED_AT = 'updatedAt',
}

export class GetQuestionsDto extends PartialType(
  OmitType(CreateQuestionDto, ['my_feedback']),
) {
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  answer: string;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  orderBy?: QueryCategoriesOrderByColumn =
    QueryCategoriesOrderByColumn.CREATED_AT;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.ASC;
  @IsOptional()
  @ApiPropertyOptional()
  @Transform((val) => parseInt(val.value))
  limit?: number = 15;
  @IsOptional()
  @ApiPropertyOptional()
  @Transform((val) => parseInt(val.value))
  page?: number = 1;
}
