import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { Player } from '../../../core/models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  private _allPlayers: Player[] = [];

  @Input()
  get allPlayers(): Player[] {
    return this._allPlayers;
  }
  set allPlayers(allPlayers: Player[]) {
    this._allPlayers = allPlayers;
  }

  constructor(public router: Router, public gameService: GameService) {}

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
