import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { ConnectionService } from 'src/app/core/connection/connection.service';
import { ConnectionSocketService } from 'src/app/core/connection/connection.socket.service';

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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.progressBarTimer();
  }

  progressBarTimer() {
    const progressBarInterval = setInterval(() => {
      if (this.progressBarValue > 0) {
        this.progressBarValue = this.progressBarValue - 2;
      } else {
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
