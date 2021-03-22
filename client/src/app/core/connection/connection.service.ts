import { Injectable } from '@angular/core';
import { Connection } from './connection.interface';
import { environment } from 'src/environments/environment';
import { GameDataModel } from '../models/gameData.model';
import { Player } from '../models/player.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService implements Connection {
  connect() {}
  disconnect() {}
  port: string = environment.socket_port;
  host: string = environment.socket_host;
  options: object = {};
  createGame(gameId: string, gameData: GameDataModel): void {}
  createPlayer(playerName: string, gameId: string): void {}
  setPlayerReady(playerId: string, gameId: string, ready: boolean): void {}
  joinGame(gameId: string): void {}
  getAllPlayersByGameId(gameId: string): void {}
  stopGame(gameId: string): void {}
  sendGameResults(gameId: string, gameResults: Array<boolean>): void {}
  allPlayersByGameId: any;
  isGameStarted: any;
  isGameFinished: any;
  gameData: any;
  id: string = '';
}
