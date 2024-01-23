import { Module } from '@nestjs/common';
import { FormatterModule } from '../infrastructure/formatter/formatter.module';
import { DataModule } from '../infrastructure/data/data.module'
import { EventModule } from '../infrastructure/event/event.module';
import { ProcessTable } from '../infrastructure/data/ProcessTable';
import { SocketEmitter } from '../infrastructure/event/SocketEmitter';
import { UnixFormatter } from '../infrastructure/formatter/UnixFormatter';
import { StartSession } from './StartSession';
import { BootstrapTable } from './BootstrapTable';

const providers = [
  {
    provide: 'StartSession',
    inject: ['ProcessTable'],
    useFactory: (table: ProcessTable) => new StartSession(table)
  },
  {
    provide: 'BootstrapTable',
    inject: ['ProcessTable', 'UnixFormatter', SocketEmitter],
    useFactory: (table: ProcessTable, formatter: UnixFormatter, emitter: SocketEmitter) => new BootstrapTable(table, formatter, emitter)
  },
];

@Module({
  imports: [FormatterModule, DataModule, EventModule],
  providers: [...providers],
  exports: [...providers]
})
export class UsecasesModule {}
