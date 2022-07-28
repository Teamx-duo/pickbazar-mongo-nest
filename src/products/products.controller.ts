import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { Product } from './schemas/product.schema';
import { GetPopularProductsDto } from './dto/get-popular-products.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/uploads/uploads.utils';
import config from 'src/config';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('products')
@UseInterceptors(LoggingInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/product',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async createProduct(
    @UploadedFiles()
    images: { image: Express.Multer.File[]; gallery: Express.Multer.File[] },
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productsService.create({
      ...createProductDto,
      image: `${config.app.imageUrl}/category/${images.image[0].filename}`,
      gallery: [
        ...images.gallery.map(
          (image) => `${config.app.imageUrl}/category/${image.filename}`,
        ),
        `${config.app.imageUrl}/category/${images.image[0].filename}`,
      ],
    });
  }

  @Get()
  async getProducts(@Query() query: GetProductsDto) {
    return this.productsService.getProducts(query);
  }

  @Get(':slug')
  async getProductBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.getProductBySlug(slug);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/images/product',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles()
    images: { image: Express.Multer.File[]; gallery: Express.Multer.File[] },
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, {
      ...updateProductDto,
      ...(images.image
        ? {
            image: `${config.app.imageUrl}/tag/${images.image[0].filename}`,
          }
        : {}),
      ...(images.gallery
        ? {
            gallery: [
              ...images.gallery.map(
                (image) => `${config.app.imageUrl}/category/${image.filename}`,
              ),
              `${config.app.imageUrl}/category/${images.image[0].filename}`,
            ],
          }
        : {}),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

@Controller('popular-products')
export class PopularProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getProducts(@Query() query: GetPopularProductsDto): Promise<Product[]> {
    return this.productsService.getPopularProducts(query);
  }
}
