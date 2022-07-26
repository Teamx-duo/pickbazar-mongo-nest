import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  public name: string;
  @IsString()
  @IsOptional()
  public icon: string;
  @IsString()
  @IsOptional()
  public image: string;
}
