import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ConnectionService } from '../connection/connection.service';
import { GameDataModel } from '../models/gameData.model';
import { Player } from '../models/player.model';
import { gameDataModelFactory } from '../../core/models/gameDataFactory.model';

@Injectable()
export class GameService {
  id: string = '';
  subscription: Subscription;
  allPlayers: Player[] = [];
  isGameStarted = false;
  isGameFinished = false;

  gameData: GameDataModel = gameDataModelFactory();

  stopActualRound = false;

  maxRounds = 5;
  actualRound = 1;
  roundsResults = new Array(this.maxRounds);

  gameFinishedObserverSubject = new Subject<boolean>();
  gameFinishedObserver = this.gameFinishedObserverSubject.asObservable();

  constructor(private connectionService: ConnectionService) {
    this.subscription = connectionService.allPlayersByGameId.subscribe(
      (allPlayers: Player[]) => {
        this.allPlayers = allPlayers;
      }
    );

    this.subscription = connectionService.isGameStarted.subscribe(
      (isStarted: boolean) => {
        this.isGameStarted = isStarted;
      }
    );

    this.subscription = connectionService.gameData.subscribe(
      (gameData: GameDataModel) => {
        this.gameData = gameData;
        this.maxRounds = gameData.rounds;
      }
    );

    this.subscription = connectionService.isGameFinished.subscribe(
      (isGameFinished: boolean) => {
        this.isGameFinished = isGameFinished;
        this.sendResults();
      }
    );
  }

  createGame(id: string, gameData: GameDataModel) {
    this.id = id;
    this.maxRounds = gameData.rounds;
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

  sendResults() {
    console.log(`send results ${this.roundsResults}`);
    this.connectionService.sendGameResults(this.id, this.roundsResults);
  }

  // gameFinished() {
  //   this.connectionService.gameFinished(this.id);
  //   this.isGameFinishedSubject.next(true);
  // }

  stopGame() {
    this.connectionService.stopGame(this.id);
  }

  ngOnDestroy() {
    console.log('destroy Game Service');
    this.connectionService.disconnect();
    this.subscription.unsubscribe();
  }
}
