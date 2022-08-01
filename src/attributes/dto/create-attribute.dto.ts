import { PickType } from '@nestjs/swagger';
import { Attribute } from '../schemas/attribute.schema';
import { AttributeValue } from '../schemas/attributeValue.schema';

export class CreateAttributeDto extends PickType(Attribute, [
  'name',
  'shop',
  'slug',
]) {}
export class AttributeValueDto extends PickType(AttributeValue, [
  'attribute',
  'meta',
  'shop',
  'value',
]) {}
