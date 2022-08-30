import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Tag } from '../schemas/tag.schema';

export class CreateTagDto extends PickType(Tag, [
  'details',
  'icon',
  'image',
  'products',
  'name',
  'slug',
  'type',
]) {}

// export class CreateTagDto extends PickType(Tag, [
//   'name',
//   'type',
//   'details',
//   'image',
//   'icon',
// ]) {

// }
