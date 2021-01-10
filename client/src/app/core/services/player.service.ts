import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements Player {
  id: string = '';
  data = {
    name: '',
    ready: false,
    gameId: '',
  };

  constructor(private connectionService: ConnectionService) {
    //this.connectionService.connect();
  }

  createPlayer(playerName: string, gameId: string) {
    this.connectionService.createPlayer(playerName, gameId);
  }
}
