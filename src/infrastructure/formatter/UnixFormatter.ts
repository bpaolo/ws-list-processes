import { Injectable, Inject } from '@nestjs/common'
import { IFormatter } from '../../domain/formatter/IFormatter';
import { IDriver } from '../../domain/extractor/IDriver';
import { IProcess } from '../../domain/model/IProcess';
import { Process } from '../../infrastructure/model/Process';

export class UnixFormatter implements IFormatter {
  constructor(private driver: IDriver) 
  {}

  async getProcesses(): Promise<IProcess[]> {
    const raw: any = await this.driver.getProcessesRaw();
    const [header, ...rows] = raw.split("\n");
    const indexes = this.getIndexes(header);
    return rows.map((row) => new Process(
      this.getPid(indexes.pid, row),
      this.getName(indexes.name, row),
      this.getDate(indexes.date, row)
    ))
  }

  getIndexes(header){
    return {
      pid: header.indexOf('PID')+3,
      name: header.indexOf('CMD'),
      date: header.indexOf('PID')+4
    }
  }

  getPid(index, row){
    return parseInt(row.substring(0, index).split(' ').pop());
  }

  getName(index, row){
    return row.substring(index, row.length+1);
  }

  getDate(index, row){
    return row.substring(index, index+24);
  }
}
