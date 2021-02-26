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

  isGameStartedSubject = new Subject<boolean>();
  isGameStarted = this.isGameStartedSubject.asObservable();

  gameDataSubject = new Subject<{}>();
  gameData = this.gameDataSubject.asObservable();

  stopActualRoundSubject = new Subject<boolean>();
  stopActualRound = this.stopActualRoundSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io(environment.socket_host + environment.socket_port);
    this.listenerConnected();
    this.listenerAllPlayers();
    this.listenerStartGame();
    this.listenerGameData();
    this.listenerGoToNextRound();
  }

  createGame(gameId: string, gameData: {}) {
    console.log('creates Game');
    this.socket.emit('createGame', { gameId, gameData });
  }

  createPlayer(playerName: string, gameId: string) {
    console.log('createPlayer', { playerName, gameId });
    this.socket.emit('createPlayer', { playerName, gameId });
  }

  joinGame(gameId: string) {
    this.socket.emit('joinGame', { gameId });
    return true;
  }

  goToNextRound(gameId: string) {
    console.log('emits goToNextRound');
    this.socket.emit('goToNextRound', { gameId });
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

  listenerStartGame() {
    this.socket.on('startGame', (isStarted: boolean) => {
      this.isGameStartedSubject.next(isStarted);
    });
  }

  listenerGameData() {
    this.socket.on('gameData', (gameData: {}) => {
      this.gameDataSubject.next(gameData);
    });
  }

  listenerGoToNextRound() {
    this.socket.on('goToNextRound', (goToNextRound: boolean) => {
      console.log('someone went to the next round');
      this.stopActualRoundSubject.next(goToNextRound);
    });
  }

  getAllPlayersByGameId(gameId: string) {
    console.log('getAllPlayersByGameId', gameId);
    this.socket.emit('getAllPlayersByGameId', { gameId });
  }

  setPlayerReady(playerId: string, gameId: string, ready: boolean) {
    console.log(`player ${playerId} set to ${ready}`);
    this.socket.emit('setPlayerReady', { playerId, gameId, ready });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
