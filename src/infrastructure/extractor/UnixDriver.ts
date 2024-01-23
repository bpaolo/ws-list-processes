import { exec } from 'child_process';
import { IDriver } from '../../domain/extractor/IDriver';

export class UnixDriver implements IDriver {
  getProcessesRaw() {
    return new Promise((resolve, reject) => {
        let command = `ps -eo pid,lstart,cmd`;
        exec(command, (err, stdout, stdin) => {
            if (err) reject(err);
            resolve(stdout);
        });
    })
  }
}
