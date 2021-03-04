import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Player } from 'src/app/core/models/player.model';

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
    this._allPlayers = allPlayers;
  }

  constructor() {}

  ngOnInit(): void {}
}
