import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import attributesJson from './attributes.json';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import {
  AttributeValue,
  AttributeValueSchema,
} from './schemas/attributeValue.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { GetAttributesArgs } from './dto/get-attributes.dto';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';

@Injectable()
export class AttributesService {
  constructor(
    @InjectModel(Attribute.name)
    private attributeModel: PaginateModel<AttributeSchema>,
    @InjectModel(AttributeValue.name)
    private attributeValueModel: PaginateModel<AttributeValueSchema>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto) {
    const attr = await this.attributeModel.create({
      name: createAttributeDto.name,
      shop: createAttributeDto.shop,
      slug: createAttributeDto.slug,
    });
    const values = await this.attributeValueModel.insertMany(
      createAttributeDto.values.map((val) => ({
        value: val.value,
        meta: val.meta,
        attribute: attr._id,
      })),
    );
    attr.values = values.map((val) => val._id);
    return await attr.save();
  }

  async findAll({ limit, page, shop }: GetAttributesArgs) {
    const response = await this.attributeModel.paginate(
      { ...(shop ? { shop } : {}) },
      { limit, page, populate: ['shop', 'values'] },
    );
    return PaginationResponse(response);
  }

  async findOne(id: string) {
    return this.attributeModel.findById(id).populate(['values']);
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    const attrList: any = [];

    for (let i = 0; i < updateAttributeDto.values?.length; i++) {
      const attr = updateAttributeDto.values[i];
      let attrValue: any;
      if (attr.id) {
        attrValue = await this.attributeValueModel.findByIdAndUpdate(attr.id, {
          $set: { meta: attr.meta, value: attr.value },
        });
      } else {
        attrValue = await this.attributeValueModel.create({
          value: attr.value,
          meta: attr.meta,
          attribute: id,
        });
      }
      attrList.push(attrValue._id);
    }
    return await this.attributeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: updateAttributeDto.name,
          values: attrList,
        },
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.attributeModel.findByIdAndRemove(id, { new: true });
  }
}
