import { IProcess } from './IProcess';
import { IEmitter } from '../event/IEmitter.ts';

export interface IProcessTable {
  add(process: IProcess);
  remove(pid: number);
  readTable(client: any);
  reload(processes: IProcess[]);
}
