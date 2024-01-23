import { IProcess } from '../model/IProcess.ts'

export interface IEmitter {
  add(process: IProcess);
  remove(pid: number);
  addToClient(client: any, process: IProcess);
  setServer(server: any);
}
