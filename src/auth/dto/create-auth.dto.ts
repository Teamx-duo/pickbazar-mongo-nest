import { ApiProperty, PickType } from '@nestjs/swagger';
import { CoreMutationOutput } from 'src/common/dto/core-mutation-output.dto';
import { User } from 'src/users/schema/user.schema';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Role } from './../../common/constants/roles.enum';

export class RegisterDto extends PickType(User, ['name', 'email', 'password']) {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsEnum(Role)
  permission: Role = Role.CUSTOMER;
}

export class LoginDto extends PickType(User, ['email', 'password']) {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

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
  otp_id: string;
  code: string;
  phone_number: string;
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
  @IsString()
  phone_number: string;
}
export class OtpLoginDto {
  @IsString()
  @IsOptional()
  otp_id?: string;
  @IsString()
  code: string;
  @IsString()
  phone_number: string;
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  email?: string;
}
