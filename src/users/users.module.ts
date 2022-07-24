import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProfilesController, UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Profile, ProfileSchema } from './schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
})
export class UsersModule {}
