import { Injectable } from '@angular/core';
import { Connection } from './connection.interface';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Injectable()
export abstract class ConnectionService implements Connection {
  abstract connect(): any;
  abstract createGame(game: Game, player: Player): boolean;
  abstract port: string;
  abstract host: string;
  abstract options: object;
}
