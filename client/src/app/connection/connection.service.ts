import { Injectable } from '@angular/core';
import { Connection } from './connection.interface';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';

@Injectable()
export abstract class ConnectionService implements Connection {
  abstract connect(): any;
  abstract createGame(game: Game, player: Player): boolean;
  abstract joinGame(game: Game, player: Player): boolean;
  abstract getAllPlayers(game: Game): void;
  abstract port: string;
  abstract host: string;
  abstract options: object;
  abstract id: string;
}
