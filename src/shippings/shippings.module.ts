import { Module } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from './schemas/shipping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shipping.name, schema: ShippingSchema },
    ]),
  ],
  controllers: [ShippingsController],
  providers: [ShippingsService],
})
export class ShippingsModule {}
