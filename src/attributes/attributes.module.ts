import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import {
  AttributeValue,
  AttributeValueSchema,
} from './schemas/attributeValue.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsModule } from 'src/shops/shops.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributeSchema },
    ]),
    MongooseModule.forFeature([
      { name: AttributeValue.name, schema: AttributeValueSchema },
    ]),
    ShopsModule,
  ],
  controllers: [AttributesController],
  providers: [AttributesService],
  exports: [MongooseModule, AttributesService],
})
export class AttributesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AttributesController);
  }
}
