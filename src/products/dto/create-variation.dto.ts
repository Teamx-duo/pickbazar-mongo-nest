// import { ApiProperty, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVariationDto {
  @IsString()
  public title: string;
  @IsNumber()
  public price: number;
  @IsNumber()
  public sale_price: number;
  @IsString()
  @IsOptional()
  public sku: string;
  @IsString()
  @IsOptional()
  public is_disable: string;
  @IsString()
  @IsOptional()
  public quantity: string;
}

export class CreateVariationOptionDto {
  @IsString()
  public name: string;
  @IsString()
  public value: string;
  @IsString()
  public variation: string;
}

export class MultipleVariationOptionsDto {
  @IsString()
  public name: string;
  @IsString()
  public value: string;
}

export class CreateVariationOptionsDto {
  @ApiProperty({
    isArray: true,
    type: MultipleVariationOptionsDto,
  })
  @IsArray()
  options: CreateVariationOptionDto[];
  @IsString()
  public variation: string;
}
