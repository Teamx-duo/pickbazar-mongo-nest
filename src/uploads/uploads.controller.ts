import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
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
  async uploadMultipleFiles(
    @UploadedFiles() attachment: Express.Multer.File[],
  ) {
    const response = [];
    attachment.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get('images/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './uploads/images' });
  }
}
