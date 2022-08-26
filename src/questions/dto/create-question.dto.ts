import { PickType } from '@nestjs/swagger';
import { Question } from '../schemas/questions.schema';

export class CreateQuestionDto extends PickType(Question, [
  'feedbacks',
  'product',
  'question',
  'shop',
  'user',
]) {}
