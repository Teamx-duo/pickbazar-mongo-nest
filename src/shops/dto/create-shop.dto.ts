import { PickType } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsArray,
} from 'class-validator';
import { Shop } from '../schemas/shop.shema';

export class CreateShopDto extends PickType(Shop, [
  'name',
  'address',
  'description',
  'cover_image',
  'logo',
  'settings',
  'owner',
  'balance',
]) {
  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  categories: string[];
}

// export class CreateShopDto {
//   @IsBoolean()
//   @IsOptional()
//   is_active?: boolean;

//   @IsString()
//   @IsOptional()
//   owner?: string;

//   @IsNumber()
//   @IsOptional()
//   orders_count?: number;

//   @IsNumber()
//   @IsOptional()
//   products_count?: number;

//   @IsNumber()
//   @IsOptional()
//   balance?: string;

//   @IsString()
//   name: string;

//   @IsString()
//   @IsOptional()
//   slug: string;

//   @IsString()
//   description: string;

//   @IsString()
//   @IsOptional()
//   cover_image?: string;

//   @IsString()
//   @IsOptional()
//   logo?: string;
// }

export class ApproveShopDto {
  @IsMongoId()
  public id: string;

  @IsNumber()
  public admin_commission_rate: number;
}

export class DisApproveDto {
  @IsMongoId()
  public id: string;
}
