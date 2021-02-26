import { Injectable } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { GameDataModel } from '../models/gameData.model';
import { Player } from '../models/player.model';

@Injectable()
export class GameService {
  id: string = '';
  subscription: Subscription;
  allPlayersByGameIdSubject = new Subject<Player[]>();
  allPlayersByGameId = this.allPlayersByGameIdSubject.asObservable();

  isGameStartedSubject = new Subject<boolean>();
  isGameStarted = this.isGameStartedSubject.asObservable();

  gameDataSubject = new Subject<GameDataModel>();
  gameData = this.gameDataSubject.asObservable();

  readonly maxRounds = 5;
  actualRound = 1;

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

    this.subscription = connectionService.gameData.subscribe(
      (gameData: GameDataModel) => {
        this.gameDataSubject.next(gameData);
      }
    );
  }

  createGame(id: string, gameData: GameDataModel) {
    this.id = id;
    this.connectionService.createGame(id, gameData);
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

  isGameEnded(): boolean {
    return this.actualRound > this.maxRounds ? true : false;
  }

  goToNextRound() {
    this.actualRound = this.actualRound + 1;
  }

  ngOnDestroy() {
    console.log('destroy Game Service');
    this.connectionService.disconnect();
    this.subscription.unsubscribe();
  }
}
