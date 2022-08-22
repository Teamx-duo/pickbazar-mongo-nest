import { HttpException, Injectable } from '@nestjs/common';
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
    const isExist = await this.settingsModel.countDocuments();
    if (isExist > 0) {
      const dbSettings = await this.settingsModel.find({});
      const setting = dbSettings?.[0];
      return await setting.update({ $set: createSettingDto }, { new: true });
    }
    return await this.settingsModel.create(createSettingDto);
  }

  async findAll() {
    const settings = await this.settingsModel.find({});
    if (this.settingsModel.length > 0) {
      return settings?.[0];
    }
    return {};
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
