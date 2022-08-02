import { OmitType } from '@nestjs/swagger';
import { Tax } from '../schemas/taxes.schema';

export class CreateTaxDto extends OmitType(Tax, []) {}
