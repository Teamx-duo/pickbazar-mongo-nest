import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import attributesJson from './attributes.json';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import {
  AttributeValue,
  AttributeValueSchema,
} from './schemas/attributeValue.schema';
import { plainToClass } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { GetAttributesArgs } from './dto/get-attributes.dto';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';

const attributes = plainToClass(Attribute, attributesJson);
@Injectable()
export class AttributesService {
  constructor(
    @InjectModel(Attribute.name)
    private attributeModel: PaginateModel<AttributeSchema>,
    @InjectModel(AttributeValue.name)
    private attributeValueModel: PaginateModel<AttributeValueSchema>,
  ) {}
  private attributes: Attribute[] = attributes;

  async create(createAttributeDto: CreateAttributeDto) {
    return this.attributeModel.create(createAttributeDto);
  }

  async findAll({ limit, page, shop }: GetAttributesArgs) {
    const response = await this.attributeModel.paginate(
      { ...(shop ? { shop } : {}) },
      { limit, page },
    );
    return PaginationResponse(response);
  }

  async findOne(id: string) {
    return this.attributeModel.findById(id);
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    return await this.attributeModel.findByIdAndUpdate(
      id,
      {
        $set: updateAttributeDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.attributeModel.findByIdAndRemove(id, { new: true });
  }
}
