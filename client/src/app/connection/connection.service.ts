import { Injectable } from '@angular/core';
import { Connection } from './connection.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService implements Connection {
  connect() {}
  disconnect() {}
  port: string = environment.socket_port;
  host: string = environment.socket_host;
  options: object = {};
  createGame: any;
  id: string = '';
}
