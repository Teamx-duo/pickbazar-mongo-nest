import { PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Attribute } from '../schemas/attribute.schema';
import { AttributeValue } from '../schemas/attributeValue.schema';

export class AttributeValueDto extends PickType(AttributeValue, [
  'attribute',
  'meta',
  'value',
]) {
  @IsMongoId()
  @IsOptional()
  id?: string;
}

export class CreateAttributeDto extends PickType(Attribute, [
  'name',
  'shop',
  'slug',
]) {
  @IsArray()
  @IsOptional()
  values?: AttributeValueDto[];
}
