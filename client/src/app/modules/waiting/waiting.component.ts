import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/core/models/player.model';
import { GameService } from '../../core/services/game.service';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {
  private _allPlayers: Player[] = [];

  @Input()
  get allPlayers(): Player[] {
    return this._allPlayers;
  }
  set allPlayers(allPlayers: Player[]) {
    console.log('setter all players', allPlayers);
    this._allPlayers = allPlayers;
  }

  constructor(
    private router: Router,
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    //this.gameService.getAllPlayersByGameId(this.gameService.id);
  }

  /*ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    //this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }*/
}
