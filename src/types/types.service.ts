import { TypeSchema, Type } from './schemas/type.schema';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

import typesJson from './types.json';
import { GetTypesDto } from './dto/get-types.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { convertToSlug } from 'src/common/constants/common.function';

const types = plainToClass(Type, typesJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type.name)
    private typeModel: PaginateModel<TypeSchema>,
  ) {}
  private types: Type[] = types;

  async getTypes({ text, page, limit }: GetTypesDto) {
    const data = await this.typeModel.paginate(
      {
        ...(text ? { name: { $regex: text, $options: 'i' } } : {}),
      },
      { page, limit },
    );
    return PaginationResponse(data);
  }

  async getTypeBySlug(slug: string): Promise<Type> {
    return await this.typeModel.findOne({ slug });
  }

  async create(createTypeDto: CreateTypeDto) {
    return await this.typeModel.create({
      ...createTypeDto,
      slug: convertToSlug(createTypeDto.name),
    });
  }

  async findAll() {
    return await this.typeModel.find({});
  }

  async findOne(id: string) {
    return await this.typeModel.findById(id);
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    return await this.typeModel.findByIdAndUpdate(id, { $set: updateTypeDto });
  }

  async remove(id: string) {
    return await this.typeModel.findByIdAndRemove(id, { new: true });
  }
}
