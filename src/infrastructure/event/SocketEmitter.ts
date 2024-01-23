import { Injectable, Inject } from '@nestjs/common';
import { IEmitter } from '../../domain/event/IEmitter';
import { IProcess } from '../../domain/model/IProcess';

export class SocketEmitter implements IEmitter {
  private server: any;
 
  setServer(server: any){
    this.server = server;
  }

  add(process: IProcess) {
    const payload = { sender: 'server', subject: 'general', message: process }
		this.server.to(payload.subject).emit('addProcess', payload);
  }

  remove(pid: number) {
    const payload = { sender: 'server', subject: 'general', message: pid }
    this.server.to(payload.subject).emit('removeProcess', payload);
  }

  addToClient(clientId: any, process: IProcess) {
    const payload = { sender: 'server', subject: 'general', message: process }
		this.server.to(clientId).emit('addProcess', payload);
  }
}
