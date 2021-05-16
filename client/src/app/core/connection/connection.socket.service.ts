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

  isGameFinishedSubject = new Subject<boolean>();
  isGameFinished = this.isGameFinishedSubject.asObservable();

  isGameCreatedSubject = new Subject<boolean>();
  isGameCreated = this.isGameCreatedSubject.asObservable();

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = io(environment.socket_host + environment.socket_port);
    this.listenerConnected();
    this.listenerAllPlayers();
    this.listenerStartGame();
    this.listenerGameData();
    this.listenStopGame();
    this.listenerGameCreated();
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

  listenStopGame() {
    this.socket.on('stopGame', (isGameFinished: boolean) => {
      console.log('Stop game instruction received');
      this.isGameFinishedSubject.next(isGameFinished);
    });
  }

  listenerGameCreated() {
    this.socket.on('gameCreated', (isGameCreated: boolean) => {
      this.isGameCreatedSubject.next(isGameCreated);
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

  stopGame(gameId: string) {
    this.socket.emit('stopGame', { gameId });
  }

  sendGameResults(gameId: string, gameResults: Array<boolean>) {
    console.log('game results sent');
    this.socket.emit('updateResults', { gameId, gameResults });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
