import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'src/configuration/config';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid =
      this.configService.get<ConfigType['twilio']>('twilio').accountSid;
    const authToken =
      this.configService.get<ConfigType['twilio']>('twilio').authToken;

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid =
      this.configService.get<ConfigType['twilio']>('twilio').serviceSid;

    return this.twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  }

  async confirmPhoneNumber(phone_number: string, verificationCode: string) {
    const serviceSid =
      this.configService.get<ConfigType['twilio']>('twilio').serviceSid;

    const result = await this.twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ code: verificationCode, to: phone_number });

    if (!result.valid || result.status !== 'approved') {
      throw new HttpException(
        'Unable to verify OTP or Invalid code.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
