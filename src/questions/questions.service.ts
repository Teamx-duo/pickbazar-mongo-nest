import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, PaginateModel, Types } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { CreateQuestionFeebackDto } from './dto/create-feedback.dto';
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
      answer: { $exists: false },
    });
    if (existingQuestions && existingQuestions.length > 1) {
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
        populate: [{ path: 'product' }, { path: 'user' }, { path: 'shop' }],
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
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

  async addFeedBack(id: string, createFeedbackDto: CreateQuestionFeebackDto) {
    const { positive, negative, user } = createFeedbackDto;
    const exists: any = await this.questionModel.findOne({
      feedbacks: { $elemMatch: { user } },
    });
    if (exists) {
      const feed = exists.feedbacks.find((feed) => feed.user?.equals(user));
      if (feed.positive === positive || feed.negative === negative) {
        throw new HttpException(
          'Your response has already been recorded',
          HttpStatus.BAD_REQUEST,
        );
      }
      const feedback = await this.questionModel.findOneAndUpdate(
        {
          feedbacks: { $elemMatch: { user } },
        },
        {
          $set: {
            ...(positive
              ? {
                  'feedbacks.$.positive': true,
                  'feedbacks.$.negative': false,
                }
              : {
                  'feedbacks.$.positive': false,
                  'feedbacks.$.negative': true,
                }),
          },
          $inc: {
            positive_feedbacks_count: positive ? 1 : -1,
            negative_feedbacks_count: negative ? 1 : -1,
          },
        },
        { new: true },
      );
      return feedback;
    }
    return await this.questionModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          ...(positive ? { positive_feedbacks_count: 1 } : {}),
          ...(negative ? { negative_feedbacks_count: 1 } : {}),
        },
        $push: {
          feedbacks: {
            positive,
            negative,
            user,
          },
        },
      },
      { new: true },
    );
  }
}
