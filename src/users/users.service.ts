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
import { paginate } from 'src/common/pagination/paginate';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    @InjectModel(User.name) private userModel: Model<UserSchema>,
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
      const savedUser = await userData.save();
      const profile = await this.profileModel.create({
        customer: savedUser._id,
      });
      savedUser.profile = profile._id;
      await savedUser.save();
      return user;
    } else {
      throw new HttpException(
        'REGISTRATION.USER_ALREADY_REGISTERED',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getUsers({ text, limit, page }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: User[] = this.users;
    if (text?.replace(/%/g, '')) {
      data = fuse.search(text)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    const url = `/users?limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }
  async findOne(id: string) {
    return await this.userModel
      .findOne({ _id: id })
      .populate(['profile', 'shops', 'address', 'managed_shop']);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, { $set: updateUserDto });
  }

  async addUserPermission(id: string, updateUserDto: UpdateUserPermissionsDto) {
    return await this.userModel.findByIdAndUpdate(id, {
      $push: { roles: updateUserDto.permissions },
    });
  }

  async addUserShop(id: string, shop_id: any) {
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
