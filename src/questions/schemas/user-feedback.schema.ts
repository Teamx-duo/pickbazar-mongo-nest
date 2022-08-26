import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export type UserFeedbackSchema = UserFeedback & Document;

@Schema({ timestamps: true })
export class UserFeedback {
  @IsMongoId()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Prop()
  positive: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Prop()
  negative: boolean;
}

export const UserFeedbackSchema = SchemaFactory.createForClass(UserFeedback);

UserFeedbackSchema.plugin(mongoosePaginate);
