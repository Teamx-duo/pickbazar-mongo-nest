import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { getCSVFile, unflattenCsv } from 'src/uploads/uploads.utils';
import { ImportDto } from './dto/create-import.dto';
import { createReadStream } from 'fs';
import {
  Attribute,
  AttributeSchema,
} from 'src/attributes/schemas/attribute.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Response } from 'express';

@Injectable()
export class ImportsService {
  constructor(
    @InjectModel(Attribute.name)
    private attributeModel: PaginateModel<AttributeSchema>,
    private readonly csvParser: CsvParser,
  ) {}

  create(createImportDto: ImportDto) {
    return 'This action adds a new import';
  }

  async createAttributes(createAttributesDto: ImportDto) {
    const csvPath = getCSVFile(createAttributesDto.file.filename);
    const stream = createReadStream(csvPath);
    const attributes = await this.csvParser.parse(
      stream,
      Attribute,
      null,
      null,
      { strict: true, separator: ',' },
    );
    return attributes.list.map((i) => unflattenCsv(i));
  }

  async allAttributes() {
    const attributes = await this.attributeModel.find({}).exec();
    return attributes;
  }

  findAll() {
    return `This action returns all imports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} import`;
  }

  remove(id: number) {
    return `This action removes a #${id} import`;
  }
}
