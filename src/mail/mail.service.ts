import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'src/configuration/config';
import { SendMailDto } from './dto/send-email.dto';
import { User } from 'src/users/schema/user.schema';
import SendGrid from '@sendgrid/mail';
import { Role } from 'src/common/constants/roles.enum';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(
      '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',
    );
  }

  async sendEmail(sendMailDto: SendGrid.MailDataRequired) {
    SendGrid.send(sendMailDto);
  }

  async sendUserConfirmationEmail(user: User, token: string) {
    const { adminUrl, shopUrl } =
      this.configService.get<ConfigType['app']>('app');
    const url = user?.roles?.includes(Role.CUSTOMER)
      ? `${shopUrl}/verify?token=${token}`
      : `${adminUrl}/verify?token=${token}`;

    await SendGrid.send({
      to: user.email,
      from: this.configService.get<ConfigType['mail']>('mail').mailFromAddress,
      templateId: 'd-8e8773f87ce04a4188f8d53f3d6f56cd',
      dynamicTemplateData: {
        user: user.name,
        link: url,
      },
    });
  }

  async sendStaffLoginCredentials(user: User) {
    const args = {
      name: user.name,
      email: user.email,
      password: user.password,
      link: this.configService.get<ConfigType['app']>('app').adminUrl,
    };
    await SendGrid.send({
      to: user.email,
      from: this.configService.get<ConfigType['mail']>('mail').mailFromAddress,
      templateId: 'd-c59be05f23184cdfb9363d582ebb7702',
      dynamicTemplateData: args,
    });
  }

  async sendForgetPasswordEmail(email: string, token: string, code: string) {
    const shopUrl = this.configService.get<ConfigType['app']>('app').shopUrl; // sender address
    const url = `${shopUrl}/reset?token=${token}&code=${code}`;
    const args = {
      user: email,
      link: url,
      code: code,
    };
    await SendGrid.send({
      to: email,
      from: this.configService.get<ConfigType['mail']>('mail').mailFromAddress,
      templateId: 'd-c14a283457564ff5bf92e8ea7ae5ec87',
      dynamicTemplateData: args,
    });
  }
}
