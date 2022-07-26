import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationArgs {
  @IsNumber()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public limit?: number = 15;
  @IsNumber()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public page?: number = 1;
}
