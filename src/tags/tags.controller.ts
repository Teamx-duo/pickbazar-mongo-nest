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
  UploadedFiles,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GetTagsDto, TagPaginator } from './dto/get-tags.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/uploads/uploads.utils';
import config from 'src/config';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/tag',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  create(
    @UploadedFiles()
    images: { image: Express.Multer.File[]; icon: Express.Multer.File[] },
    @Body() createTagDto: CreateTagDto,
  ) {
    return this.tagsService.create({
      ...createTagDto,
      image: `${config.app.imageUrl}/category/${images.image[0].filename}`,
      icon: `${config.app.imageUrl}/category/${images.icon[0].filename}`,
    });
  }

  @Get()
  async findAll(@Query() query: GetTagsDto): Promise<TagPaginator> {
    return this.tagsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'icon', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/tag',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles()
    images: { image: Express.Multer.File[]; icon: Express.Multer.File[] },
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.update(id, {
      ...updateTagDto,
      ...(images.image
        ? {
            image: `${config.app.imageUrl}/tag/${images.image[0].filename}`,
          }
        : {}),
      ...(images.icon
        ? {
            icon: `${config.app.imageUrl}/tag/${images.icon[0].filename}`,
          }
        : {}),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
