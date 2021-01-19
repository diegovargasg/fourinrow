import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable()
export class PlayerService {
  id: string = '';
  name: string = '';
  ready: boolean = false;
  gameId: string = '';

  constructor(private connectionService: ConnectionService) {}

  createPlayer(playerName: string, gameId: string) {
    this.id = this.connectionService.id;
    this.name = playerName;
    this.gameId = gameId;
    this.connectionService.createPlayer(playerName, gameId);
  }

  setPlayerReady() {
    this.ready = !this.ready;
    this.connectionService.setPlayerReady(
      this.connectionService.id,
      this.gameId,
      this.ready
    );
  }

  ngOnDestroy() {
    console.log('destroy Player Service');
  }
}
