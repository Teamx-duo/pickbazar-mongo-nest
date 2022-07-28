import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateShopSettingDto {
  @IsArray()
  @IsOptional()
  socials?: string[];

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  shop: string;
}
