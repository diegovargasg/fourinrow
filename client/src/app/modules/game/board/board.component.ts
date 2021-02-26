import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { GameDataModel } from '../../../../app/core/models/gameData.model';
import { gameDataModelFactory } from 'src/app/core/models/gameDataFactory.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private _gameData: GameDataModel = gameDataModelFactory();
  progressBarValue = 100;
  challenge = '';
  challengeResult: any;
  roundsIndex = 0;
  isInputDisabled = false;
  progressBarInterval: any = null;
  roundsResults = new Array(this.gameService.maxRounds);

  @Input()
  get gameData(): GameDataModel {
    return this._gameData;
  }
  set gameData(gameData: GameDataModel) {
    this._gameData = gameData;
  }

  constructor(
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {}

  getRoundInfo() {
    const challengeObj = this.gameData.config[this.roundsIndex];
    const keys = Object.keys(challengeObj);
    const values = Object.values(challengeObj);
    this.challenge = keys[0];
    this.challengeResult = values[0];
  }

  ngOnInit(): void {
    this.getRoundInfo();
    this.startProgressBarTimer();
  }

  stopProgressBarTimer() {
    clearInterval(this.progressBarInterval);
  }

  resetProgressBarTimer() {
    this.progressBarValue = 100;
  }

  loadNewRound() {
    this.gameService.goToNextRound();
    this.gameService.shouldStopActualRound = false;

    if (this.gameService.isGameEnded()) {
      this.isInputDisabled = true;
      this.stopProgressBarTimer();
    } else {
      this.isInputDisabled = false;
      this.roundsIndex = this.roundsIndex + 1;
      this.getRoundInfo();
      this.resetProgressBarTimer();
    }
  }

  startProgressBarTimer() {
    this.progressBarInterval = setInterval(() => {
      console.log(this.gameService.shouldStopActualRound);
      if (
        this.progressBarValue > 0 &&
        !this.gameService.shouldStopActualRound
      ) {
        this.progressBarValue = this.progressBarValue - 2;
      } else {
        this.updateResults(false);
        this.loadNewRound();
      }
    }, 200);
  }

  updateResults(correct: boolean) {
    if (correct) {
      this.roundsResults[this.roundsIndex] = 'Y';
    } else {
      this.roundsResults[this.roundsIndex] = 'X';
    }
  }

  sendResult(result: HTMLInputElement) {
    this.isInputDisabled = true;
    let resultMessage = '';
    let panelClass = null;

    if (result.value == this.challengeResult) {
      console.log(this.gameService.id);
      this.gameService.forceOtherPlayersToNextRound();
      resultMessage = 'Good job!';
      panelClass = ['mat-toolbar', 'mat-primary'];
      this.updateResults(true);
      this.loadNewRound();
    } else {
      resultMessage = 'Wrong!';
      panelClass = ['mat-toolbar', 'mat-warn'];
      this.updateResults(false);
    }

    result.value = '';

    this.snackBar.open(resultMessage, '', {
      duration: 600,
      panelClass: panelClass,
    });
  }
}
