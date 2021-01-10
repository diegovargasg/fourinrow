import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { ConnectionSocket } from './connection.socket.interface';
import { Subject } from 'rxjs';
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

  allPlayersByGameIdSubject = new Subject<Player[]>();
  allPlayersByGameId = this.allPlayersByGameIdSubject.asObservable();

  constructor() {
    this.connect();
  }

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
    console.log('createPlayer', { playerName, gameId });
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
    this.socket.on('getAllPlayersByGameId', (allPlayers: Player[]) => {
      this.allPlayersByGameIdSubject.next(allPlayers);
    });
  }

  getAllPlayersByGameId(gameId: string) {
    console.log('getAllPlayersByGameId', gameId);
    this.socket.emit('getAllPlayersByGameId', { gameId });
  }

  disconnect() {}
}
