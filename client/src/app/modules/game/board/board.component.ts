import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { ConnectionService } from 'src/app/core/connection/connection.service';
import { ConnectionSocketService } from 'src/app/core/connection/connection.socket.service';
import { GameDataModel } from '../../../../app/core/models/gameData.model';
import { gameDataModelFactory } from 'src/app/core/models/gameDataFactory.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [
    { provide: ConnectionService, useClass: ConnectionSocketService },
    GameService,
  ],
})
export class BoardComponent implements OnInit {
  progressBarValue = 100;
  challenge = '';
  private _gameData: GameDataModel = gameDataModelFactory();
  private rounds = 1;

  @Input()
  get gameData(): GameDataModel {
    return this._gameData;
  }
  set gameData(gameData: GameDataModel) {
    this._gameData = gameData;
  }

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    console.log(this.gameData.config[0]);
    this.progressBarTimer();
    console.log('Game Data in Board', this.gameData);
  }

  progressBarTimer() {
    const progressBarInterval = setInterval(() => {
      if (this.progressBarValue > 0) {
        this.progressBarValue = this.progressBarValue - 2;
      } else {
        this.rounds = this.rounds + 1;
        this.gameService.levelFinished();
        if (this.gameService.isGameEnded) {
          clearInterval(progressBarInterval);
        } else {
          this.progressBarValue = 100;
          //Generate next level
        }
      }
    }, 100);
  }
}
