import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../core/connection/connection.service';
import { GameService } from '../core/services/game.service';
import { PlayerService } from '../core/services/player.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {
  constructor(
    private connectionService: ConnectionService,
    private game: GameService,
    private player: PlayerService
  ) {}

  ngOnInit(): void {
    //this.player.id = this.connectionService.id;
    //this.connectionService.getAllPlayers();
  }
}
