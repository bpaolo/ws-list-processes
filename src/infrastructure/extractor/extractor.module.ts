import { Module } from '@nestjs/common';
import { UnixDriver } from './UnixDriver';

@Module({
  imports: [],
  providers: [UnixDriver],
  exports: [UnixDriver]
})
export class ExtractorModule {}
