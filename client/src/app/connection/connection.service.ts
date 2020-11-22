import { Injectable } from '@angular/core';
import { Connection } from './connection.interface';

@Injectable()
export abstract class ConnectionService implements Connection {
  abstract connect(): object;
  abstract port: string;
  abstract host: string;
  abstract options: object;
}
