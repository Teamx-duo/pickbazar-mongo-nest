import { TypeSchema, Type } from './schemas/type.schema';
import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

import typesJson from './types.json';
import { GetTypesDto } from './dto/get-types.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationResponse } from 'src/common/middlewares/response.middleware';
import { convertToSlug } from 'src/common/constants/common.function';
import { Banner, BannerSchema } from './schemas/banner.schema';
import { TypeSetting, TypeSettingSchema } from './schemas/typeSetting.schema';

const options = {
  keys: ['name'],
  threshold: 0.3,
};
@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type.name)
    private typeModel: PaginateModel<TypeSchema>,
    @InjectModel(Banner.name)
    private bannerModel: PaginateModel<BannerSchema>,
    @InjectModel(TypeSetting.name)
    private typeSettingModel: PaginateModel<TypeSettingSchema>,
  ) {}

  async getTypes({ search, page, limit, sortedBy, orderBy }: GetTypesDto) {
    const data = await this.typeModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {
        page,
        limit,
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return PaginationResponse(data);
  }

  async getTypeBySlug(slug: string): Promise<Type> {
    return await this.typeModel.findOne({ slug }).populate(['banners']);
  }

  async create(createTypeDto: CreateTypeDto) {
    const bannerIds = [];
    const createObj = { ...createTypeDto };
    const dbType = await this.typeModel.create({
      promotional_sliders: createObj.promotional_sliders,
      name: createObj.name,
      icon: createObj.icon,
      settings: createObj.settings,
      slug: convertToSlug(createObj.name),
    });
    if (createTypeDto.banners) {
      const banners = await this.bannerModel.insertMany(createTypeDto.banners);
      bannerIds.push(...banners.map((banner) => banner._id));
    }
    createObj.banners = bannerIds;
    dbType.banners = bannerIds;
    return await dbType.save();
  }

  async findAll({ search, sortedBy, orderBy }: GetTypesDto) {
    return await this.typeModel.find(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {},
      {
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
  }

  async findOne(id: string) {
    return await this.typeModel.findById(id).populate(['banners']);
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    const updateObj = { ...updateTypeDto };
    const bannerIds = [];

    for (let i = 0; i < updateObj.banners.length; i++) {
      const banner = updateObj.banners[i];
      let savedBanner;
      if (banner.id) {
        savedBanner = await this.bannerModel.findByIdAndUpdate(id, {
          $set: banner,
        });
      } else {
        savedBanner = await this.bannerModel.create(banner);
      }
      bannerIds.push(savedBanner._id);
    }

    if (bannerIds.length > 0) {
      updateObj.banners = bannerIds;
    }

    const updated = await this.typeModel.findByIdAndUpdate(
      id,
      {
        $set: updateObj,
      },
      { new: true },
    );
    return updated;
  }

  async remove(id: string) {
    return await this.typeModel.findByIdAndRemove(id, { new: true });
  }
}
