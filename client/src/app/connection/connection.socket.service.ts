import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ConnectionSocket } from './connection.socket.interface';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectionSocketService implements ConnectionSocket {
  port = environment.socket_port;
  host = environment.socket_host;
  socket: any = {};
  options = {};
  id: string = '';

  connect() {
    this.socket = io(environment.socket_host + environment.socket_port);
    this.listenerConnected();
    this.listenerAllPlayers();
    return this.socket;
  }

  createGame(game: Game, player: Player) {
    console.log('creates Game');
    this.socket.emit('createGame', { game, player });
    this.listenerAllPlayers();
  }

  joinGame(game: Game, player: Player) {
    this.socket.emit('joinGame', { game, player });
    this.listenerAllPlayers();
    return true;
  }

  listenerConnected() {
    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });
  }

  listenerAllPlayers() {
    this.socket.on('getAllPlayers');
  }

  getAllPlayers(game: Game) {
    this.socket.emit('getAllPlayers', { game });
  }

  disconnect() {}

  constructor() {}
}
