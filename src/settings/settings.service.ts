import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { SeoSettingSchema, SeoSetting } from './schemas/seoSettings.schema';
import { Setting, SettingSchema } from './schemas/setting.schema';
@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name)
    private settingsModel: PaginateModel<SettingSchema>,
    @InjectModel(SeoSetting.name)
    private seoSettingsModel: PaginateModel<SeoSettingSchema>,
  ) {}
  async create(createSettingDto: CreateSettingDto) {
    // const seo = await this.seoSettingsModel.create(
    //   createSettingDto.options.seo,
    // );
    const settings = await this.settingsModel.create(createSettingDto);
    // await seo.update({ $set: { setting: settings._id } });
    return settings;
  }

  async findAll() {
    return await this.settingsModel.find({});
  }

  async findOne(id: string) {
    return await this.settingsModel.findById(id);
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    return await this.settingsModel.findByIdAndUpdate(
      id,
      {
        $set: updateSettingDto,
      },
      { new: true },
    );
  }

  async remove(id: string) {
    return await this.settingsModel.findByIdAndRemove(id, {
      new: true,
    });
  }
}
