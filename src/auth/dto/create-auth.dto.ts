import { ApiProperty, PickType } from '@nestjs/swagger';
import { CoreMutationOutput } from 'src/common/dto/core-mutation-output.dto';
import { User } from 'src/users/schema/user.schema';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsMobilePhone,
  IsEmail,
} from 'class-validator';
import { Role } from './../../common/constants/roles.enum';
import { EmailVerification } from '../schemas/emailVerification.schema';

export class RegisterDto extends PickType(User, ['name', 'email', 'password']) {
  @IsEnum(Role)
  permission: Role = Role.CUSTOMER;
}

export class LoginDto extends PickType(User, ['email', 'password']) {}

export class SocialLoginDto {
  provider: string;
  access_token: string;
}
export class ChangePasswordDto {
  @IsString()
  oldPassword: string;
  @IsString()
  newPassword: string;
  @IsOptional()
  user: any;
}
export class ForgetPasswordDto {
  @IsString()
  email: string;
}
export class VerifyForgetPasswordDto {
  @IsString()
  email: string;
  @IsString()
  token: string;
}
export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  token: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthResponse {
  token: string;
  user: User;
}
export class GetUsersResponse {
  users: User[];
}
export class CoreResponse extends CoreMutationOutput {}
export class VerifyOtpDto {
  @IsString()
  otp_id: string;
  @IsString()
  code: string;
  @IsPhoneNumber()
  phone_number: string;
  @IsString()
  sid: string;
}
export class OtpResponse {
  id: string;
  message: string;
  success: boolean;
  phone_number: string;
  provider: string;
  is_contact_exist: boolean;
}
export class OtpDto {
  @IsPhoneNumber()
  phone_number: string;
}
export class OtpLoginDto {
  @IsString()
  @IsOptional()
  otp_id?: string;
  @IsString()
  code: string;
  @IsPhoneNumber()
  phone_number: string;
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  email?: string;
}
export class ContactDto {
  @IsString()
  @IsOptional()
  description?: string;
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  subject?: string;
}

export class VerifyEmailDto extends PickType(EmailVerification, [
  'emailToken',
]) {}
