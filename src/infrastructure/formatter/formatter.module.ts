import { Module } from '@nestjs/common';
import { UnixFormatter } from './UnixFormatter';
import { ExtractorModule } from '../extractor/extractor.module';
import { UnixDriver } from '../extractor/UnixDriver';
import { IDriver } from '../../domain/extractor/IDriver';

const providers = [{
    provide: 'UnixFormatter',
    inject: [UnixDriver],
    useFactory: (driver: UnixDriver) => new UnixFormatter(driver)
  }]

@Module({
  imports: [ExtractorModule],
  providers: [...providers],
  exports: [...providers]
})
export class FormatterModule {}
