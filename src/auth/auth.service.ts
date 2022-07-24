import { plainToClass } from 'class-transformer';
import { Inject, Injectable } from '@nestjs/common';
import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
  GetUsersResponse,
} from './dto/create-auth.dto';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import usersJson from 'src/users/users.json';
import { InjectModel } from '@nestjs/mongoose';
const users = plainToClass(User, usersJson);

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserSchema>) {}

  async register(createUserInput: RegisterDto): Promise<AuthResponse> {
    const user = {
      ...createUserInput,
    };

    const userData = new this.userModel(user);
    const savedUser = await userData.save();

    return { token: 'auth token', user: savedUser };
  }

  async login(loginInput: LoginDto): Promise<AuthResponse> {
    console.log(loginInput);
    return {
      token: 'jwt token',
      user: users[0],
    };
  }

  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {
    console.log(changePasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(forgetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(verifyForgetPasswordTokenInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(resetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async socialLogin(socialLoginDto: SocialLoginDto): Promise<GetUsersResponse> {
    console.log(socialLoginDto);
    return {
      users: users,
    };
  }

  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    console.log(otpLoginDto);
    return {
      token: 'jwt token',
      user: users[0],
    };
  }

  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    console.log(verifyOtpInput);
    return {
      message: 'success',
      success: true,
    };
  }

  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    console.log(otpInput);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: '+919494949494',
      is_contact_exist: true,
    };
  }

  // async getUsers({ text, first, page }: GetUsersArgs): Promise<UserPaginator> {
  //   const startIndex = (page - 1) * first;
  //   const endIndex = page * first;
  //   let data: User[] = this.users;
  //   if (text?.replace(/%/g, '')) {
  //     data = fuse.search(text)?.map(({ item }) => item);
  //   }
  //   const results = data.slice(startIndex, endIndex);
  //   return {
  //     data: results,
  //     paginatorInfo: paginate(data.length, page, first, results.length),
  //   };
  // }
  // public getUser(getUserArgs: GetUserArgs): User {
  //   return this.users.find((user) => user.id === getUserArgs.id);
  // }
  me(): User {
    return users[0];
  }

  // updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
