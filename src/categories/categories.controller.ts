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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('categories')
@ApiBearerAuth('access-token')
@UseInterceptors(LoggingInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create({
      ...body,
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

  @Get('all')
  findAllNew(@Query() query: GetCategoriesDto) {
    return this.categoriesService.getCategoriesAll(query);
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
