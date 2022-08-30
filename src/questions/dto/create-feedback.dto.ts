import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { Question } from '../schemas/questions.schema';

export class CreateQuestionFeebackDto extends PickType(Question, ['user']) {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  positive?: boolean;
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  negative?: boolean;
}
