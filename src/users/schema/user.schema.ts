import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from 'src/addresses/schemas/address.schema';
import { Shop } from 'src/shops/schemas/shop.shema';
import { Profile, ProfileSchema } from './../schema/profile.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/constants/roles.enum';
import { Type } from 'class-transformer';

export type UserSchema = User & Document;

@Schema({ timestamps: true })
export class User {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @IsEmail()
  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(150)
  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop?: Shop;

  @ValidateNested()
  @Type(() => Profile)
  @ApiProperty()
  @IsOptional()
  @Prop({ type: ProfileSchema })
  profile?: Profile;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] })
  shops?: Shop[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  managed_shop?: Shop;

  @IsBoolean()
  @IsOptional()
  @Prop({ default: true })
  is_active?: boolean;

  @IsPhoneNumber(null, {
    message: 'Contact must be valid phone number. (eg: +92XXXXXXXXXX)',
  })
  @IsOptional()
  @Prop()
  contact?: string;

  @IsBoolean()
  @IsOptional()
  @Prop({ default: false })
  email_verified?: boolean;

  @IsEnum(Role)
  @IsOptional()
  @Prop({
    enum: [Role.SUPER_ADMIN, Role.STORE_OWNER, Role.STAFF, Role.CUSTOMER],
    default: Role.CUSTOMER,
    type: [String],
  })
  roles?: Role[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }] })
  address?: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);
