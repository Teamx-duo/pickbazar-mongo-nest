import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { Attribute, AttributeSchema } from './schemas/attribute.schema';
import {
  AttributeValue,
  AttributeValueSchema,
} from './schemas/attributeValue.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributeSchema },
    ]),
    MongooseModule.forFeature([
      { name: AttributeValue.name, schema: AttributeValueSchema },
    ]),
  ],
  controllers: [AttributesController],
  providers: [AttributesService],
})
export class AttributesModule {}
