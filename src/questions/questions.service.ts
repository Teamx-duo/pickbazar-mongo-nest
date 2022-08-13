import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel, Types } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { CreateQuestionDto } from './dto/create-question.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionSchema } from './schemas/questions.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: PaginateModel<QuestionSchema>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const existingQuestions = await this.questionModel.find({
      user: createQuestionDto.user,
      shop: createQuestionDto.shop,
      product: createQuestionDto.product,
    });
    if (existingQuestions && existingQuestions.length > 0) {
      throw new HttpException(
        'You cannot ask more than 2 questions over the same product.',
        400,
      );
    }
    return await this.questionModel.create(createQuestionDto);
  }

  async findAll({
    shop,
    product,
    user,
    question,
    page,
    limit,
    orderBy,
    sortedBy,
  }: GetQuestionsDto) {
    const response = await this.questionModel.paginate(
      {
        ...(shop ? { shop } : {}),
        ...(product ? { product } : {}),
        ...(user ? { user } : {}),
        ...(question ? { question: { $regex: question, $options: 'i' } } : {}),
      },
      {
        page,
        limit,
        sort: {
          [orderBy]: sortedBy,
        },
      },
    );
    return PaginationResponse(response);
  }

  async findQuestionsByProduct(
    id: string,
    {
      shop,
      product,
      user,
      question,
      page,
      limit,
      orderBy,
      sortedBy,
    }: GetQuestionsDto,
  ) {
    const response = await this.questionModel.paginate(
      {
        $and: [
          {
            ...(shop ? { shop } : {}),
            ...(product ? { product } : {}),
            ...(user ? { user } : {}),
            ...(question
              ? { question: { $regex: question, $options: 'i' } }
              : {}),
          },
          {
            answer: { $exists: true },
          },
          {
            product: new Types.ObjectId(id),
          },
        ],
      },
      {
        page,
        limit,
        sort: {
          [orderBy]: sortedBy,
        },
      },
    );
    return PaginationResponse(response);
  }

  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionModel.findByIdAndUpdate(
      id,
      {
        $set: updateQuestionDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.questionModel.findByIdAndRemove(id, { new: true });
  }
}
