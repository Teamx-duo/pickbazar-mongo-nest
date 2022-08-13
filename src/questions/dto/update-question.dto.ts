import { PartialType } from '@nestjs/swagger';
import { Question } from '../schemas/questions.schema';

export class UpdateQuestionDto extends PartialType(Question) {}
