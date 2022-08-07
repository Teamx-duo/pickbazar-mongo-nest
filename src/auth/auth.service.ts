import { JWTService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
import { UsersService } from 'src/users/users.service';
import { Profile, ProfileSchema } from 'src/users/schema/profile.schema';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Otp, OtpSchema } from './schemas/otp.schema';
const users = plainToClass(User, usersJson);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchema>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileSchema>,
    @InjectModel(Otp.name) private otpModel: Model<OtpSchema>,
    private readonly userService: UsersService,
    private readonly jwtService: JWTService,
  ) {}

  async register(createUserInput: RegisterDto) {
    const user = {
      ...createUserInput,
    };

    try {
      const savedUser = await this.userService.create(user);
      const { access_token } = await this.jwtService.createToken(
        user.email,
        savedUser.roles,
      );
      return {
        token: access_token,
        user: savedUser,
        permissions: savedUser.roles,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginInput: LoginDto) {
    const userFromDb = await this.userModel
      .findOne({
        email: loginInput.email,
      })
      .populate(['profile', 'address', 'shops']);
    if (!userFromDb)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const isValidPass = await bcrypt.compare(
      loginInput.password,
      userFromDb.password,
    );

    if (isValidPass) {
      const { access_token } = await this.jwtService.createToken(
        loginInput.email,
        userFromDb.roles,
      );
      return {
        token: access_token,
        user: userFromDb,
        permissions: userFromDb.roles,
      };
    } else {
      throw new HttpException('LOGIN.ERROR', HttpStatus.UNAUTHORIZED);
    }
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

  async otpLogin(otpLoginDto: OtpLoginDto) {
    const otp = await this.otpModel.findOne({
      code: otpLoginDto.code,
      $or: [
        { phone_number: otpLoginDto.phone_number },
        { email: otpLoginDto.email },
      ],
    });
    if (!otp) {
      throw new HttpException('Unable to login', HttpStatus.NOT_FOUND);
    }
    const userFromDb = await this.userModel
      .findOne({
        email: otpLoginDto.email,
      })
      .populate(['profile', 'address', 'shops']);
    if (!userFromDb)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    const { access_token } = await this.jwtService.createToken(
      otpLoginDto.email,
      userFromDb.roles,
    );
    return {
      token: access_token,
      user: userFromDb,
      permissions: userFromDb.roles,
    };
  }

  async verifyOtpCode(
    verifyOtpInput: VerifyOtpDto,
    user?: any,
  ): Promise<CoreResponse> {
    await this.profileModel.findOneAndUpdate(
      { user },
      { $set: { contact: verifyOtpInput.phone_number } },
    );
    return {
      message: 'success',
      success: true,
    };
  }

  async sendOtpCode(otpInput: OtpDto) {
    const otp = await this.otpModel.create({
      code: Math.floor(1000 + Math.random() * 9000),
      phone_number: otpInput.phone_number,
    });
    return {
      message: 'success',
      success: true,
      id: otp._id,
      provider: 'local',
      phone_number: otpInput.phone_number,
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
  async me(id: string) {
    return await this.userService.findOne(id);
  }

  async updateMe(id: string, updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // updateUser(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
