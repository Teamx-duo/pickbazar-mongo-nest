import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { convertToSlug } from 'src/common/constants/common.function';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetTagsDto } from './dto/get-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagSchema } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: PaginateModel<TagSchema>,
  ) {}
  private tags: Tag[] = [];

  async create(createTagDto: CreateTagDto) {
    return await this.tagModel.create({
      ...createTagDto,
      slug: convertToSlug(createTagDto.name),
    });
  }

  async findAll({ page, limit }: GetTagsDto) {
    const response = await this.tagModel.paginate({}, { page, limit });
    return PaginationResponse(response);
  }

  async findOne(id: string) {
    return await this.tagModel.findById(id);
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return await this.tagModel.findByIdAndUpdate(
      id,
      { $set: updateTagDto },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.tagModel.findByIdAndUpdate(id, { new: true });
  }
}
