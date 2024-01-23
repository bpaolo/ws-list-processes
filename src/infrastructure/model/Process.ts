import { IProcess } from '../../domain/model/IProcess';

export class Process implements IProcess{
  constructor(
    public readonly pid: number,
    public readonly name: string,
    public readonly startDate: string
  ){}
}
