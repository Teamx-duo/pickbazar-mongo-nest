import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationArgs {
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public limit?: number = 15;
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public page?: number = 1;
}
