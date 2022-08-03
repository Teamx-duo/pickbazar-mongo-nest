import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Get,
  Param,
  Res,
  Body,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import config from 'src/config';
import { UploadsService } from './uploads.service';
import { editFileName, imageFileFilter } from './uploads.utils';

@Controller('attachments')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('images')
  @UseInterceptors(
    FilesInterceptor('attachment', 20, {
      storage: diskStorage({
        destination: './uploads/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMiscalleneousImages(
    @UploadedFiles() attachment: Express.Multer.File[],
  ) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = `${config.app.imageUrl}/${file.filename}`;
      response.push(fileReponse);
    });
    return response;
  }

  @Post('product/images')
  @UseInterceptors(
    FilesInterceptor('attachment', 20, {
      storage: diskStorage({
        destination: './uploads/images/product',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadProductImages(
    @UploadedFiles() attachment: Express.Multer.File[],
  ) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = `${config.app.imageUrl}/product/${file.filename}`;
      response.push(fileReponse);
    });
    return response;
  }

  @Post('category/images')
  @UseInterceptors(
    FilesInterceptor('attachment', 20, {
      storage: diskStorage({
        destination: './uploads/images/category',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCategoryFiles(
    @UploadedFiles() attachment: Express.Multer.File[],
  ) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = `${config.app.imageUrl}/category/${file.filename}`;
      response.push(fileReponse);
    });
    return response;
  }

  @Post('tag/images')
  @UseInterceptors(
    FilesInterceptor('attachment', 20, {
      storage: diskStorage({
        destination: './uploads/images/tag',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadTagFiles(@UploadedFiles() attachment: Express.Multer.File[]) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = `${config.app.imageUrl}/tag/${file.filename}`;
      response.push(fileReponse);
    });
    return response;
  }

  @Post('type/images')
  @UseInterceptors(
    FilesInterceptor('attachment', 20, {
      storage: diskStorage({
        destination: './uploads/images/type',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadTypeFiles(@UploadedFiles() attachment: Express.Multer.File[]) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = `${config.app.imageUrl}/type/${file.filename}`;
      response.push(fileReponse);
    });
    return response;
  }

  @Post('user/images')
  @UseInterceptors(
    FilesInterceptor('attachment', 20, {
      storage: diskStorage({
        destination: './uploads/images/user',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadUserFiles(@UploadedFiles() attachment: Express.Multer.File[]) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = `${config.app.imageUrl}/user/${file.filename}`;
      response.push(fileReponse);
    });
    return response;
  }

  @Get('images/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images' });
  }

  @Get('images/category/:imgpath')
  seeCategoryImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/category' });
  }

  @Get('images/product/:imgpath')
  seeProductImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/product' });
  }

  @Get('images/user/:imgpath')
  seeUserImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/user' });
  }

  @Get('images/types/:imgpath')
  seeTypeImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/types' });
  }

  @Get('images/tag/:imgpath')
  seeTagImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/tag' });
  }

  @Get('images/coupon/:imgpath')
  seeCouponImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/coupon' });
  }

  @Get('images/shop/:imgpath')
  seeShopImage(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images/shop' });
  }
}
