import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { Player } from '../../../core/models/player.model';
import { Router } from '@angular/router';

interface finalResults {
  [key: string]: {
    wrong: number;
    correct: number;
    winner: boolean;
  };
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  private _allPlayers: Player[] = [];
  public finalResults: finalResults = {};

  @Input()
  get allPlayers(): Player[] {
    return this._allPlayers;
  }
  set allPlayers(allPlayers: Player[]) {
    allPlayers.forEach((player) => {
      const correct = player._data.results.filter((result) => {
        return result === true;
      }).length;
      const wrong = player._data.results.length - correct;
      this.finalResults[player._data.name] = {
        wrong: wrong,
        correct: correct,
        winner: false,
      };
    });
    this._allPlayers = allPlayers;
  }

  constructor(public router: Router, public gameService: GameService) {}

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
