import { PartialType } from '@nestjs/swagger';
import {
  CreateVariationDto,
  CreateVariationOptionDto,
} from './create-variation.dto';

export class UpdateVariationDto extends PartialType(CreateVariationDto) {}
export class UpdateVariationOptionDto extends PartialType(
  CreateVariationOptionDto,
) {}
