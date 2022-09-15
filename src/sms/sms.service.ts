import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor() {
    const accountSid = 'AC1b863b523cd19da809bd1ef0ddacc7c8';
    const authToken = '78f25af461740f9365d5ea2434f4b172';

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceSid = 'VAa6da6870e07f50c3e4a65dd9905f2c75';

    return this.twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  }

  async confirmPhoneNumber(phone_number: string, verificationCode: string) {
    const serviceSid = 'VAa6da6870e07f50c3e4a65dd9905f2c75';

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
