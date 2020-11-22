import { io, Socket } from 'socket.io-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from './connection.service';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';

@Injectable()
export class ConnectionSocketioService implements ConnectionService {
  port = environment.socket_port;
  host = environment.socket_host;
  options = {};
  socket: any = {};
  id: string = '';

  connect() {
    this.socket = io(environment.socket_host + environment.socket_port);
    this.listenerConnected();
    return this.socket;
  }

  createGame(game: Game, player: Player) {
    this.socket.emit('createGame', { game, player });
    this.listenerAllPlayers();
    return true;
  }

  joinGame(game: Game, player: Player) {
    this.socket.emit('joinGame', { game, player });
    this.listenerAllPlayers();
    return true;
  }

  listenerConnected() {
    this.socket.on('connect', () => {
      console.log('Connection finished', this.socket.id);
      this.id = this.socket.id;
    });
  }

  listenerAllPlayers() {
    this.socket.on('getAllPlayers');
  }

  getAllPlayers(game: Game) {
    this.socket.emit('getAllPlayers', { game });
  }

  constructor() {}
}
