import { Injectable, Inject } from '@nestjs/common';
import { IProcessTable } from '../domain/data/IProcessTable';
import { IFormatter } from '../domain/formatter/IFormatter';
import { IEmitter } from '../domain/event/IEmitter';

export class BootstrapTable {
 
  constructor(
    private table: IProcessTable,
    private formatter: IFormatter,
    private emitter: IEmitter,
  ){}

  async boot(server: any) {
    this.emitter.setServer(server);
    const processes = await this.formatter.getProcesses();
    this.table.reload(processes);

    setInterval(async () => {
      const processes = await this.formatter.getProcesses();
      this.table.reload(processes);
    }, 2000);
  }
}
