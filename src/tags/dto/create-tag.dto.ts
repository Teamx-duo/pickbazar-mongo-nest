import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsString()
  @ApiProperty()
  public type: string;

  @IsString()
  @ApiProperty()
  public details: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public image: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  public icon: string;
}

// export class CreateTagDto extends PickType(Tag, [
//   'name',
//   'type',
//   'details',
//   'image',
//   'icon',
// ]) {

// }
