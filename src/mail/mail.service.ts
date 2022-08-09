import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'src/configuration/config';
import { SendMailDto } from './dto/send-email.dto';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(sendMailDto: SendMailDto) {
    this.mailerService
      .sendMail({
        to: sendMailDto.to, // list of receivers
        from: this.configService.get<ConfigType['mail']>('mail')
          .mailFromAddress, // sender address
        subject: sendMailDto.subject, // Subject line
        text: sendMailDto.text, // plaintext body
        html: sendMailDto.html, // HTML body content
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async sendUserConfirmationEmail(user: User, token: string) {
    const url = `http:localhost:3003/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Multivendor! Confirm your Email',
      template: './verifyEmail', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email: user.name,
        link: url,
      },
    });
  }

  async sendForgetPasswordEmail(email: string, token: string, code: string) {
    const url = `http:localhost:3003/auth/forget?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Reset your password.',
      template: './forgetPassword', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: email,
        url,
        code,
      },
    });
  }
}
