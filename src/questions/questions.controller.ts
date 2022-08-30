import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/roles.enum';
import { CreateQuestionFeebackDto } from './dto/create-feedback.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CUSTOMER, Role.STORE_OWNER)
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req) {
    return this.questionsService.create({
      ...createQuestionDto,
      user: req?.user?._id,
    });
  }

  @Get('product/:id')
  findQuestionsByProduct(
    @Param() id: string,
    @Query() getQuestionsDto: GetQuestionsDto,
  ) {
    return this.questionsService.findQuestionsByProduct(id, getQuestionsDto);
  }

  @Get()
  findAll(@Query() getQuestionsDto: GetQuestionsDto) {
    return this.questionsService.findAll(getQuestionsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.STORE_OWNER)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.STORE_OWNER)
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }

  @Post('feedback/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.CUSTOMER)
  feedback(
    @Param('id') id: string,
    @Body() createFeedbackDto: CreateQuestionFeebackDto,
    @Req() req,
  ) {
    return this.questionsService.addFeedBack(id, {
      ...createFeedbackDto,
      user: req.user?._id,
    });
  }
}
