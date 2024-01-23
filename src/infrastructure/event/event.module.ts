import { Module } from '@nestjs/common';
import { SocketEmitter } from './SocketEmitter';

@Module({
  imports: [],
  providers: [SocketEmitter],
  exports: [SocketEmitter]
})
export class EventModule {}
