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

  @Input()
  get gameData(): GameDataModel {
    return this._gameData;
  }
  set gameData(gameData: GameDataModel) {
    this._gameData = gameData;
  }

  constructor(public gameService: GameService, private snackBar: MatSnackBar) {}

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
    this.gameService.loadNextRound = false;

    if (this.gameService.isGameFinished) {
      this.isInputDisabled = true;
      this.stopProgressBarTimer();
      this.gameService.sendResults();
    } else if (this.gameService.allRoundsPlayed) {
      this.isInputDisabled = true;
      this.stopProgressBarTimer();
      this.gameService.stopGame();
    } else {
      this.isInputDisabled = false;
      this.roundsIndex = this.roundsIndex + 1;
      this.getRoundInfo();
      this.resetProgressBarTimer();
    }
  }

  startProgressBarTimer() {
    this.progressBarInterval = setInterval(() => {
      if (
        this.progressBarValue > 0 &&
        !this.gameService.loadNextRound &&
        !this.gameService.isGameFinished
      ) {
        this.progressBarValue = this.progressBarValue - 2;
      } else {
        this.updateResults(false);
        this.showResulMessage(
          `Too slow! the result was ${this.challengeResult}`,
          ['mat-toolbar', 'mat-warn']
        );
        this.loadNewRound();
      }
    }, 200);
  }

  updateResults(correct: boolean) {
    if (correct) {
      this.gameService.roundsResults[this.roundsIndex] = true;
    } else {
      this.gameService.roundsResults[this.roundsIndex] = false;
    }
  }

  showResulMessage(resultMessage: string, panelClass: string[]) {
    this.snackBar.open(resultMessage, '', {
      duration: 1000,
      panelClass: panelClass,
    });
  }

  sendResult(result: HTMLInputElement) {
    this.isInputDisabled = true;
    let resultMessage = '';
    let panelClass = null;

    if (result.value == this.challengeResult) {
      this.gameService.loadNextRound = true;
      resultMessage = 'Good job!';
      panelClass = ['mat-toolbar', 'mat-primary'];
      this.updateResults(true);
      this.loadNewRound();
    } else {
      resultMessage = `wrong! the result was: ${this.challengeResult}`;
      panelClass = ['mat-toolbar', 'mat-warn'];
      this.updateResults(false);
    }

    result.value = '';
    this.showResulMessage(resultMessage, panelClass);
  }
}
