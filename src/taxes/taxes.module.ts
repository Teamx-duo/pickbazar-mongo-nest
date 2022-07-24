import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tax, TaxesSchema } from './schemas/taxes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tax.name, schema: TaxesSchema }]),
  ],
  controllers: [TaxesController],
  providers: [TaxesService],
})
export class TaxesModule {}
