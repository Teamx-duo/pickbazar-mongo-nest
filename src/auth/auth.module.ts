import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailVerification,
  EmailVerificationSchema,
} from './schemas/emailVerification.schema';
import {
  ForgottenPassword,
  ForgottenPasswordSchema,
} from './schemas/forgotPassword.schema';
import {
  ConsentRegistry,
  ConsentRegistrySchema,
} from './schemas/consentregistry.schema';
import { JWTService } from './jwt.service';
import { UsersService } from 'src/users/users.service';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailVerification.name, schema: EmailVerificationSchema },
      { name: ForgottenPassword.name, schema: ForgottenPasswordSchema },
      { name: ConsentRegistry.name, schema: ConsentRegistrySchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    UsersModule,
    HttpModule,
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JWTService, JwtStrategy],
  exports: [MongooseModule, AuthService],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(AuthController);
  }
}
