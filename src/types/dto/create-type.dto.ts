import { PickType } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Type } from '../schemas/type.schema';

export class UpdateSettingsDto {
  @IsMongoId()
  id: string;
  @IsString()
  isHome: string;
  @IsString()
  layoutType: string;
  @IsString()
  productCard: string;
}

export class UpdateBannerDto {
  @IsMongoId()
  id: string;
  @IsString()
  type: Type;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
}

export class CreateTypeDto extends PickType(Type, [
  'icon',
  'name',
  'promotional_sliders',
]) {
  @IsArray()
  @IsOptional()
  banners: UpdateBannerDto[];
  @IsOptional()
  settings: UpdateSettingsDto;
}
