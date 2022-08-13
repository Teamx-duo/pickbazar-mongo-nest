import { PickType } from '@nestjs/swagger';
import { Question } from '../schemas/questions.schema';

export class CreateQuestionDto extends PickType(Question, [
  'my_feedback',
  'product',
  'question',
  'shop',
  'user',
]) {}
