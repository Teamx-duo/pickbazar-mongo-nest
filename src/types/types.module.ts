import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './schemas/banner.schema';
import { Type, TypeSchema } from './schemas/type.schema';
import { TypeSetting, TypeSettingSchema } from './schemas/typeSetting.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Banner.name, schema: BannerSchema },
      { name: Type.name, schema: TypeSchema },
      { name: TypeSetting.name, schema: TypeSettingSchema },
    ]),
  ],
  controllers: [TypesController],
  providers: [TypesService],
  exports: [TypesService, MongooseModule],
})
export class TypesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TypesController);
  }
}
