import { Injectable, Inject } from '@nestjs/common';
import { IProcessTable } from '../domain/data/IProcessTable';

export class StartSession {
 
  constructor(
    private table: any
  ){}

  start(client: any) {
    this.table.readTable(client);
  }
}
