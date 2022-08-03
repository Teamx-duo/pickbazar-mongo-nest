import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryDto,
  CreateCategoryRequestDto,
} from './dto/create-category.dto';
import { GetCategoriesAlongChildrenDto } from './dto/get-categories-along-children.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { editFileName, imageFileFilter } from 'src/uploads/uploads.utils';
import config from 'src/config';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('categories')
@UseInterceptors(LoggingInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'icon', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/category',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  create(
    @UploadedFiles()
    images: { icon: Express.Multer.File[]; image: Express.Multer.File[] },
    @Body() body: CreateCategoryDto,
  ) {
    return this.categoriesService.create({
      ...body,
      icon: `${config.app.imageUrl}/category/${images.icon[0].filename}`,
      image: `${config.app.imageUrl}/category/${images.image[0].filename}`,
    });
  }
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './uploads/images/category',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // async create(
  //   @UploadedFile() image: Express.Multer.File,
  //   @Body() createCategoryDto: CreateCategoryRequestDto,
  // ) {
  //   console.log(createCategoryDto, image);
  //   return this.categoriesService.create({
  //     ...createCategoryDto,
  //     icon: `${config.app.imageUrl}/category/${image.filename}`,
  //   });
  // }

  @Get()
  findAll(@Query() query: GetCategoriesDto) {
    return this.categoriesService.getCategories(query);
  }
  // @Get('parents')
  // async getCategoriesAlongChildren(
  //   @Query() getCategoriesAlongChildrenArgs: GetCategoriesAlongChildrenDto,
  // ): Promise<Category[]> {
  //   return this.categoriesService.getCategoriesAlongChildren(
  //     getCategoriesAlongChildrenArgs,
  //   );
  // }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.getCategory(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
