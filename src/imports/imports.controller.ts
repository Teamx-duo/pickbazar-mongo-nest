import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ImportDto } from './dto/create-import.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  csvFileFilter,
  editFileName,
  editFileNameStr,
  getCSVFile,
} from 'src/uploads/uploads.utils';
import { json2csvAsync } from 'json-2-csv';
import { writeFile } from 'fs';
import { Response } from 'express';

@Controller('imports')
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  @Post('attributes')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads/csv',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  importAttributes(@UploadedFile() file: Express.Multer.File) {
    return this.importsService.createAttributes({ file });
  }

  @Post('products')
  importProducts(@Body() importProductsDto: ImportDto) {
    console.log(importProductsDto);
    return true;
  }
  @Post('variation-options')
  importVariationOptions(@Body() importVariationOptionsDto: ImportDto) {
    console.log(importVariationOptionsDto);
    return true;
  }
}

@Controller('exports')
export class ExportsController {
  constructor(private readonly importsService: ImportsService) {}

  @Get('attributes')
  async exportAttrs(@Res() res: Response) {
    // const attrs = await this.importsService.allAttributes();
    // let options = {
    //   delimiter: {
    //     field: ',', // Comma field delimiter
    //     eol: '\n', // Newline delimiter
    //   },
    //   prependHeader: true,
    //   sortHeader: false,
    //   excelBOM: true,
    //   trimHeaderValues: true,
    //   trimFieldValues: true,
    //   keys: ['name', 'shop', 'slug', 'values'],
    // };
    // const data = await json2csvAsync(attrs, options);
    // writeFile(
    //   getCSVFile('attributes.json'),
    //   JSON.stringify(data),
    //   'utf-8',
    //   (error) => {
    //     if (error) {
    //       throw new HttpException(
    //         'Unable to create CSV file.',
    //         HttpStatus.INTERNAL_SERVER_ERROR,
    //       );
    //     } else {
    //       res.sendFile(getCSVFile('attributes.json'));
    //     }
    //   },
    // );
  }

  @Post('products')
  importProducts(@Body() importProductsDto: ImportDto) {
    console.log(importProductsDto);
    return true;
  }
  @Post('variation-options')
  importVariationOptions(@Body() importVariationOptionsDto: ImportDto) {
    console.log(importVariationOptionsDto);
    return true;
  }
}
