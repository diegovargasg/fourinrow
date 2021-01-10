import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService implements Game {
  id: string = '';
  data = {
    started: false,
    players: [],
    config: {},
  };

  constructor(private connectionService: ConnectionService) {
    //this.connectionService.connect();
  }

  createGame(id: string) {
    this.connectionService.createGame(id);
  }

  joinGame(id: string) {
    this.connectionService.joinGame(id);
  }

  getGameById(id: string) {
    return null;
  }
}
