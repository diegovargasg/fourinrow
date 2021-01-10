import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ConnectionSocket } from './connection.socket.interface';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';

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
  }

  createGame(gameId: string) {
    console.log('creates Game');
    this.socket.emit('createGame', { gameId });
  }

  createPlayer(playerName: string, gameId: string) {
    this.socket.emit('createPlayer', { playerName, gameId });
  }

  joinGame(gameId: string) {
    this.socket.emit('joinGame', { gameId });
    return true;
  }

  listenerConnected() {
    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });
  }

  listenerAllPlayers() {
    this.socket.on('getAllPlayers', (allPlayers: []) => {
      console.log('received all players');
      console.log(allPlayers);
    });
  }

  getAllPlayers(game: Game) {
    this.socket.emit('getAllPlayers', { game });
  }

  disconnect() {}

  constructor() {
    this.connect();
  }
}
