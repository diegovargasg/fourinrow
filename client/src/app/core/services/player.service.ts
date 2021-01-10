import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  id: string = '';

  constructor(private connectionService: ConnectionService) {}

  createPlayer(playerName: string, gameId: string) {
    this.id = this.connectionService.id;
    this.connectionService.createPlayer(playerName, gameId);
  }

  destroyPlayer() {
    this.id = '';
  }
}
