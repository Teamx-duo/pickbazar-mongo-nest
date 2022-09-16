import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  HttpCode,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/common/constants/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ContactDto,
  ForgetPasswordDto,
  LoginDto,
  OtpDto,
  OtpLoginDto,
  RegisterDto,
  ResetPasswordDto,
  SocialLoginDto,
  VerifyEmailDto,
  VerifyForgetPasswordDto,
  VerifyOtpDto,
} from './dto/create-auth.dto';

@Controller()
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async createAccount(@Body() registerDto: RegisterDto, @Res() res) {
    try {
      const response = await this.authService.register(registerDto);
      res.status(200).json(response);
    } catch (err) {
      return res
        .status(err.status ? err.status : HttpStatus.BAD_REQUEST)
        .json(
          new HttpException(
            err.message ? err.message : 'Something went wrong',
            err.status ? err.status : HttpStatus.BAD_REQUEST,
          ),
        );
    }
  }
  @Post('token')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res) {
    try {
      const response = await this.authService.login(loginDto);
      res.status(200).json(response);
    } catch (err) {
      return res
        .status(err.status)
        .json(new HttpException(err.message, err.status));
    }
  }
  @Post('social-login-token')
  socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }
  @Post('otp-login')
  otpLogin(@Body() otpLoginDto: OtpLoginDto) {
    return this.authService.otpLogin(otpLoginDto);
  }
  @Post('send-otp-code')
  @Roles(Role.CUSTOMER, Role.STORE_OWNER, Role.SUPER_ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  sendOtpCode(@Body() otpDto: OtpDto) {
    return this.authService.sendOtpCode(otpDto);
  }
  @Post('verify-otp-code')
  @Roles(Role.CUSTOMER, Role.STORE_OWNER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  verifyOtpCode(@Body() verifyOtpDto: VerifyOtpDto, @Req() req) {
    return this.authService.verifyOtpCode(verifyOtpDto, req.user._id);
  }
  @Post('verify-email')
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword({
      ...changePasswordDto,
      user: req.user,
    });
  }
  @Post('logout')
  async logout(): Promise<boolean> {
    return true;
  }
  @Post('verify-forget-password-token')
  verifyForgetPassword(
    @Body() verifyForgetPasswordDto: VerifyForgetPasswordDto,
  ) {
    return this.authService.verifyForgetPasswordToken(verifyForgetPasswordDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req) {
    return this.authService.me(req.user._id);
  }

  @Post('contact')
  @UseGuards(AuthGuard('jwt'))
  contact(@Body() contactDto: ContactDto) {
    return this.authService.sendContactEmail(contactDto);
  }

  @Put('me')
  @UseGuards(AuthGuard('jwt'))
  updateMe(@Req() req, @Body() updateUserBody: UpdateUserDto) {
    return this.authService.updateMe(req.user._id, updateUserBody);
  }
}
