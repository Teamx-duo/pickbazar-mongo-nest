import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Banner, BannerSchema } from 'src/types/schemas/banner.schema';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type DashboardSchema = Dashboard & Document;

@Schema({ timestamps: true })
export class Dashboard {
  @ValidateNested({ each: true })
  @Type(() => Banner)
  @IsArray()
  @ApiProperty({ type: [Banner] })
  @IsOptional()
  @Prop({ type: [BannerSchema] })
  banners: Banner[];

  @IsString({ each: true })
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Prop()
  promotional_sliders: string[];
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);

DashboardSchema.plugin(mongoosePaginate);
