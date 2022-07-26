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

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'icon',
          maxCount: 1,
        },
        {
          name: 'image',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/types',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  create(
    @UploadedFiles()
    images: { icon: Express.Multer.File[]; image: Express.Multer.File[] },
    @Body() createTypeDto: CreateTypeDto,
  ) {
    return this.typesService.create({
      ...createTypeDto,
      icon: `${config.app.imageUrl}/types/${images.icon[0].filename}`,
      image: `${config.app.imageUrl}/types/${images.image[0].filename}`,
    });
  }

  @Get()
  findAll(@Query() query: GetTypesDto) {
    return this.typesService.getTypes(query);
  }

  @Get('all')
  getAllTypes() {
    return this.typesService.findAll();
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
