import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsArray, IsNotIn, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/category.schema';

export class CreateCategoryDto {
  @IsString()
  public name: string;
  @IsString()
  public type: string;
  @IsString()
  public details: string;
  @IsString()
  @IsOptional()
  public parent: string;
  @IsString()
  @IsOptional()
  public image: string;
  @IsString()
  @IsOptional()
  public icon: string;
}

export class CreateCategoryRequestDto extends PickType(Category, [
  'name',
  'details',
  'parent',
]) {}
