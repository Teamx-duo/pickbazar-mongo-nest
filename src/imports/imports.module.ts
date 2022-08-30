import { Module } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ExportsController, ImportsController } from './imports.controller';
import { CsvModule } from 'nest-csv-parser';
import { AttributesModule } from 'src/attributes/attributes.module';

@Module({
  imports: [CsvModule, AttributesModule],
  controllers: [ImportsController, ExportsController],
  providers: [ImportsService],
})
export class ImportsModule {}
