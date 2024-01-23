import { Module } from '@nestjs/common';
import { ProcessGateway } from './wsserver/process.gateway';
import { UsecasesModule } from './usecases/usecases.module';

@Module({
  imports: [UsecasesModule],
  controllers: [],
  providers: [ProcessGateway],
})
export class AppModule {}
