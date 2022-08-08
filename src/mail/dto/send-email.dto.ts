import { IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  subject?: string;
  @IsString()
  to: string[];
  @IsString()
  text: string;
  @IsString()
  html?: string;
}
