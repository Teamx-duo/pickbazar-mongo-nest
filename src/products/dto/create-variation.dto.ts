// import { ApiProperty, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsMongoId()
  @IsOptional()
  public product: string;
  @IsString()
  @IsOptional()
  public quantity: string;
  @IsMongoId()
  @IsOptional()
  public id?: string;
}

export class CreateVariationOptionDto {
  @IsString()
  public name: string;
  @IsString()
  public value: string;
  @IsMongoId()
  public variation: string;
  @IsMongoId()
  @IsOptional()
  public product: string;
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
  @IsOptional()
  @IsMongoId()
  public variation?: string;
}
