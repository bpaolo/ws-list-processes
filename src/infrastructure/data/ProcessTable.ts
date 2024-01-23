import { IProcessTable } from '../../domain/data/IProcessTable';
import { IProcess } from '../../domain/model/IProcess';
import { IEmitter } from '../../domain/event/IEmitter';

var Table = {
  list: {}
}

export class ProcessTable implements IProcessTable {
  constructor(private emitter: IEmitter){}

  add(process: IProcess) {
    if(!Table.list[process.pid]) {
      Table.list[process.pid] = process;
      this.emitter.add(process);
    }
  }

  remove(pid: number){
    delete Table.list[pid];
    this.emitter.remove(pid);
  }

  readTable(client){
    const keys = Object.keys(Table.list);
    keys.map((pid)=>{
      this.emitter.addToClient(client, Table.list[pid]);
    })
  }

  reload(processes: IProcess[]) {
    const currentList = {...Table.list};
    processes.map((process)=>{
      this.add(process);
      delete currentList[process.pid];
    });
    const finishedPids = Object.keys(currentList);
    finishedPids.map((pid) => this.remove(parseInt(pid)));
  }
}
