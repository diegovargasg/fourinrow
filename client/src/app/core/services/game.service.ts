import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  id: string = '';
  subscription: Subscription;
  allPlayersByGameIdSubject = new Subject<Player[]>();
  allPlayersByGameId = this.allPlayersByGameIdSubject.asObservable();

  constructor(private connectionService: ConnectionService) {
    this.subscription = connectionService.allPlayersByGameId.subscribe(
      (allPlayers: Player[]) => {
        console.log('from name subscription');
        console.log(allPlayers);
        this.allPlayersByGameIdSubject.next(allPlayers);
      }
    );
  }

  createGame(id: string) {
    this.id = id;
    this.connectionService.createGame(id);
  }

  joinGame(id: string) {
    this.id = id;
    this.connectionService.joinGame(id);
  }

  getGameById(id: string) {
    return null;
  }

  getAllPlayersByGameId(id: string) {
    this.connectionService.getAllPlayersByGameId(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  destroyGame() {
    this.id = '';
    this.connectionService.disconnect();
  }
}
