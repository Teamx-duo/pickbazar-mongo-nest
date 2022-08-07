import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Fuse from 'fuse.js';

import { User, UserSchema } from './schema/user.schema';
import { Profile, ProfileSchema } from './schema/profile.schema';
import usersJson from './users.json';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, PaginateModel } from 'mongoose';
import { UpdateUserPermissionsDto } from './dto/update-permission.dto';
const users = plainToClass(User, usersJson);

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
const fuse = new Fuse(users, options);
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: PaginateModel<UserSchema>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileSchema>,
  ) {}
  private users: User[] = users;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      ...createUserDto,
    };
    const userRegistered = await this.userModel.findOne({
      email: user.email,
    });
    if (!userRegistered) {
      const userData = new this.userModel(user);
      const password = await bcrypt.hash(user.password, 10);
      userData.password = password;
      await userData.save();
      return user;
    } else {
      throw new HttpException(
        'REGISTRATION.USER_ALREADY_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getUsers({ text, limit, page }: GetUsersDto) {
    return await this.userModel.paginate(
      {
        ...(text ? { name: text } : {}),
      },
      { limit, page, populate: ['shops', 'address', 'profile'] },
    );
  }
  async findOne(id: string) {
    return await this.userModel
      .findOne({ _id: id })
      .populate(['profile', 'shops', 'address', 'managed_shop']);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto });
  }

  async addUserPermission(
    id: string | ObjectId,
    updateUserDto: UpdateUserPermissionsDto,
  ) {
    return await this.userModel.findByIdAndUpdate(id, {
      $push: { roles: updateUserDto.permissions },
    });
  }

  async addUserAddress(id: string | ObjectId, addressId: any) {
    return await this.userModel.findByIdAndUpdate(id, {
      $push: { address: addressId },
    });
  }

  async addUserShop(id: string | ObjectId, shop_id: any) {
    const user = await this.userModel.findById(id);
    if (user.managed_shop) {
      await user.update({
        $push: { shops: shop_id },
      });
    } else {
      await user.update({
        $push: { shops: shop_id },
        $set: { managed_shop: shop_id },
      });
    }
    return user;
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndRemove(id, { new: true });
  }
}
