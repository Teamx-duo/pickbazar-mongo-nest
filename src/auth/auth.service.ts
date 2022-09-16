import { JWTService } from './jwt.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './../users/dto/create-user.dto';
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
  VerifyEmailDto,
  ContactDto,
} from './dto/create-auth.dto';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import usersJson from 'src/users/users.json';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { Profile, ProfileSchema } from 'src/users/schema/profile.schema';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Otp, OtpSchema } from './schemas/otp.schema';
import {
  ForgottenPassword,
  ForgottenPasswordSchema,
} from './schemas/forgotPassword.schema';
import { MailService } from 'src/mail/mail.service';
import {
  EmailVerification,
  EmailVerificationSchema,
} from './schemas/emailVerification.schema';
import { SmsService } from 'src/sms/sms.service';
import { ConfigType } from 'src/configuration/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserSchema>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileSchema>,
    @InjectModel(Otp.name) private otpModel: Model<OtpSchema>,
    @InjectModel(EmailVerification.name)
    private emailVerificationModel: Model<EmailVerificationSchema>,
    @InjectModel(ForgottenPassword.name)
    private forgottenPasswordModel: Model<ForgottenPasswordSchema>,
    private readonly userService: UsersService,
    private readonly jwtService: JWTService,
    private readonly mailService: MailService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserInput: RegisterDto) {
    const user = {
      ...createUserInput,
    };

    try {
      const savedUser = await this.userService.create({
        ...user,
        roles: [user.permission],
      });
      const { access_token } = await this.jwtService.createToken(
        user.email,
        savedUser.roles,
      );
      await this.emailVerificationModel.create({
        email: user.email,
        emailToken: access_token,
      });
      await this.mailService.sendUserConfirmationEmail(savedUser, access_token);
      return {
        success: true,
        message:
          'We have sent you an email on the given account. Please verify.',
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
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    if (!userFromDb.is_active)
      throw new HttpException(
        'Your account has been suspended temporarily. Please contact support if you think this is a mistake.',
        HttpStatus.NOT_FOUND,
      );

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
      throw new HttpException('Unable to login', HttpStatus.UNAUTHORIZED);
    }
  }

  async changePassword(changePasswordInput: ChangePasswordDto) {
    const isValidPass = await bcrypt.compare(
      changePasswordInput.oldPassword,
      changePasswordInput.user?.password,
    );
    if (isValidPass) {
      const password = await bcrypt.hash(changePasswordInput.newPassword, 10);
      await this.userService.update(changePasswordInput.user?._id, {
        password,
      });

      return {
        success: true,
        message: 'Password change successful',
      };
    } else {
      throw new HttpException(
        'Unable to change password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async forgetPassword(forgetPasswordInput: ForgetPasswordDto) {
    const forgottenPassword: any = await this.forgottenPasswordModel.findOne({
      email: forgetPasswordInput.email,
    });
    if (
      forgottenPassword &&
      (new Date().getTime() -
        new Date(forgottenPassword?.updatedAt).getTime()) /
        60000 <
        5
    ) {
      throw new HttpException(
        'Email has already been sent.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const user = await this.userService.findOneByEmail(
        forgetPasswordInput.email,
      );
      if (!user) {
        return {
          success: false,
          message: 'User not found.',
        };
      }
      const code = (Math.floor(Math.random() * 9000000) + 1000000).toString();
      const forgottenPasswordModel =
        await this.forgottenPasswordModel.findOneAndUpdate(
          { email: forgetPasswordInput.email },
          {
            $set: {
              email: forgetPasswordInput.email,
              newPasswordToken: code, //Generate 7 digits number,
            },
          },
          { upsert: true, new: true },
        );

      const { access_token } = await this.jwtService.createForgetPasswordToken(
        forgetPasswordInput.email,
      );
      await this.mailService.sendForgetPasswordEmail(
        forgetPasswordInput.email,
        access_token,
        code,
      );
      if (forgottenPasswordModel) {
        return {
          token: access_token,
          email: forgottenPasswordModel.email,
          success: true,
          message: 'Email has been sent successfully.',
        };
      } else {
        throw new HttpException(
          'Unable to create forgot password token.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ) {
    const emailVerif: any = await this.forgottenPasswordModel.findOne({
      newPasswordToken: verifyForgetPasswordTokenInput.token,
      email: verifyForgetPasswordTokenInput.email,
    });
    if (
      emailVerif &&
      (new Date().getTime() - new Date(emailVerif?.updatedAt).getTime()) /
        60000 >
        10
    ) {
      throw new HttpException(
        'Your verification code has expired.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (emailVerif && emailVerif.email) {
      const { access_token } = await this.jwtService.createResetPasswordToken(
        emailVerif.email,
      );
      return {
        token: access_token,
        success: true,
        message: 'Please change your password.',
      };
    } else {
      throw new HttpException(
        'Invalid code or unable to authenticate.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const emailVerif = await this.emailVerificationModel.findOne({
      emailToken: verifyEmailDto.emailToken,
    });
    if (emailVerif && emailVerif.email) {
      await this.userService.updateByEmail(emailVerif.email, {
        email_verified: true,
      });
      return {
        success: true,
        message: 'Email verified successfully',
      };
    } else {
      throw new HttpException(
        'Unable to verify your email.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordDto) {
    const emailVerif: any = await this.forgottenPasswordModel.findOneAndDelete(
      {
        newPasswordToken: resetPasswordInput.token,
        email: resetPasswordInput.email,
      },
      { new: true },
    );
    if (
      emailVerif &&
      (new Date().getTime() - new Date(emailVerif?.updatedAt).getTime()) /
        60000 >
        10
    ) {
      throw new HttpException(
        'Your verification code has expired.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (emailVerif) {
      const password = await bcrypt.hash(resetPasswordInput.password, 10);
      await this.userService.updateByEmail(resetPasswordInput.email, {
        password,
      });
      return {
        success: true,
        message: 'Password change successful',
      };
    } else {
      throw new HttpException(
        'Invalid token or unable to authenticate.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async socialLogin(socialLoginDto: SocialLoginDto) {
    console.log(socialLoginDto);
    return {};
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

  async verifyOtpCode(verifyOtpInput: VerifyOtpDto, user?: any) {
    await this.smsService.confirmPhoneNumber(
      verifyOtpInput?.phone_number,
      verifyOtpInput.code,
    );
    const dbUser = await this.userModel.findByIdAndUpdate(user, {
      $set: { contact: verifyOtpInput.phone_number },
    });
    return {
      message: 'success',
      success: true,
      profile: dbUser,
    };
  }

  async sendOtpCode(otpInput: OtpDto) {
    const otp = await this.otpModel.create({
      code: Math.floor(1000 + Math.random() * 9000),
      phone_number: otpInput.phone_number,
    });
    const twilio = await this.smsService.initiatePhoneNumberVerification(
      otpInput.phone_number,
    );
    return {
      message: 'success',
      success: true,
      id: otp._id,
      provider: 'twilio',
      phone_number: otpInput.phone_number,
      twilio,
    };
  }
  async me(id: string) {
    return await this.userService.findOne(id);
  }
  async sendContactEmail(contactDto: ContactDto) {
    return await this.mailService.sendEmail({
      to: 'info@teamx.global',
      subject: contactDto.subject,
      text: contactDto.description,
      from: this.configService.get<ConfigType['mail']>('mail').mailFromAddress,
    });
  }

  async updateMe(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findById(id, { $set: updateUserDto });
  }
}
