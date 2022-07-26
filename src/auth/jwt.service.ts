import * as jwt from 'jsonwebtoken';
// import { default as config } from '../config';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '../../node_modules/@nestjs/mongoose';
import { User } from 'src/users/schema/user.schema';
import config from 'src/config';

@Injectable()
export class JWTService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createToken(email: string, roles: string[]) {
    const expiresIn = '7d',
      secretOrKey = config.jwt.secretOrKey;
    const userInfo = { email: email, roles: roles };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async createForgetPasswordToken(email: string) {
    const expiresIn = '15 min',
      secretOrKey = config.jwt.secretOrKey;
    const userInfo = { email };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async createResetPasswordToken(email: string) {
    const expiresIn = '3 min',
      secretOrKey = config.jwt.secretOrKey;
    const userInfo = { email };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<User> {
    const userFromDb = await this.userModel.findOne({
      email: signedUser.email,
    });
    if (userFromDb) {
      return userFromDb;
    }
    return null;
  }
}
