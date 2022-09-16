import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tax, TaxesSchema } from './schemas/taxes.schema';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middlware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tax.name, schema: TaxesSchema }]),
  ],
  controllers: [TaxesController],
  providers: [TaxesService],
  exports: [TaxesService, MongooseModule],
})
export class TaxesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TaxesController);
  }
}
