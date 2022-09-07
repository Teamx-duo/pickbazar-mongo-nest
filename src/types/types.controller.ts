import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { GetTypesDto } from './dto/get-types.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/uploads/uploads.utils';
import config from 'src/config';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('types')
@ApiBearerAuth('access-token')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create({
      ...createTypeDto,
    });
  }

  @Get()
  findAll(@Query() query: GetTypesDto) {
    return this.typesService.getTypes(query);
  }

  @Get('all')
  getAllTypes(@Query() query: GetTypesDto) {
    return this.typesService.findAll(query);
  }

  @Get(':slug')
  getTypeBySlug(@Param('slug') slug: string) {
    return this.typesService.getTypeBySlug(slug);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(id);
  }
}
