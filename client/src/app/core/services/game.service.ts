import { Injectable } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';

@Injectable()
export class GameService {
  id: string = '';
  subscription: Subscription;
  allPlayersByGameIdSubject = new Subject<Player[]>();
  allPlayersByGameId = this.allPlayersByGameIdSubject.asObservable();
  isGameStartedSubject = new Subject<boolean>();
  isGameStarted = this.isGameStartedSubject.asObservable();
  isGameEnded = false;
  levels = 5;

  constructor(private connectionService: ConnectionService) {
    this.subscription = connectionService.allPlayersByGameId.subscribe(
      (allPlayers: Player[]) => {
        console.log('from name subscription');
        console.log(allPlayers);
        this.allPlayersByGameIdSubject.next(allPlayers);
      }
    );

    this.subscription = connectionService.isGameStarted.subscribe(
      (isStarted: boolean) => {
        this.isGameStartedSubject.next(isStarted);
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

  gameFinished() {
    console.log('game Finished');
    this.isGameEnded = true;
  }

  levelFinished() {
    this.levels = this.levels - 1;
    if (this.levels === 0) {
      this.gameFinished();
    }
  }

  ngOnDestroy() {
    console.log('destroy Game Service');
    this.connectionService.disconnect();
    this.subscription.unsubscribe();
  }
}
