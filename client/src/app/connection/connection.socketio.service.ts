import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from './connection.service';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Injectable()
export class ConnectionSocketioService implements ConnectionService {
  port = environment.socket_port;
  host = environment.socket_host;
  options = {};
  socket: any = {};

  connect() {
    this.socket = io(environment.socket_host + environment.socket_port);
    return this.socket;
  }

  createGame(game: Game, player: Player) {
    this.socket.emit('createGame', { game, player });
    return true;
  }

  joinGame(game: Game, player: Player) {
    this.socket.emit('joinGame', { game, player });
    return true;
  }

  constructor() {}
}
