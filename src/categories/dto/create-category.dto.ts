import { PickType } from '@nestjs/swagger';
import { IsArray, IsNotIn, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/category.schema';

export class CreateCategoryDto extends PickType(Category, [
  'children',
  'details',
  'icon',
  'image',
  'name',
  'parent',
  'products',
  'slug',
  'type',
]) {}

export class CreateCategoryRequestDto extends PickType(Category, [
  'name',
  'details',
  'parent',
]) {}
