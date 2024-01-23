import { IProcess } from '../model/IProcess.ts';
mport { IDriver } from '../../domain/extractor/IDriver';

export interface IFormatter {
  async getProcesses(): Promise<IProcess[]>;
}
