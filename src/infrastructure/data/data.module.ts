import { Module } from '@nestjs/common';
import { SocketEmitter } from '../event/SocketEmitter';
import { EventModule } from '../event/event.module';
import { ProcessTable } from '../data/ProcessTable';

const providers = [{
    provide: 'ProcessTable',
    inject: [SocketEmitter],
    useFactory: (emitter: SocketEmitter) => new ProcessTable(emitter)
  }]

@Module({
  imports: [EventModule],
  providers: [...providers],
  exports: [...providers]
})
export class DataModule {}
