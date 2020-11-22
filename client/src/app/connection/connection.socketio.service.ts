import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from './connection.service';

@Injectable()
export class ConnectionSocketioService implements ConnectionService {
  port = environment.socket_port;
  host = environment.socket_host;
  options = {};
  socket: object = {};

  connect() {
    this.socket = io(environment.socket_host + environment.socket_port);
    return this.socket;
  }

  constructor() {}
}
