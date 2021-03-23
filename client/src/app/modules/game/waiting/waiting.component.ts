import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/core/models/player.model';
import { GameService } from 'src/app/core/services/game.service';
import copy from 'copy-text-to-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
})
export class WaitingComponent implements OnInit {
  private _allPlayers: Player[] = [];
  isActualPlayerReady = false;

  constructor(
    public gameService: GameService,
    private snackBar: MatSnackBar,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void {}

  @Input()
  get allPlayers(): Player[] {
    return this._allPlayers;
  }
  set allPlayers(allPlayers: Player[]) {
    this._allPlayers = allPlayers;
  }

  onReady() {
    this.playerService.setPlayerReady();
    this.isActualPlayerReady = this.playerService.ready;
  }

  onCopy() {
    const url = `${window.location.host}/join/${this.gameService.id}`;
    let message = '';
    let panelClass: Array<string> = [];

    if (copy(url)) {
      message = 'Invite link copied';
      panelClass = ['mat-toolbar', 'mat-primary'];
    } else {
      message = 'Invite could not be copied';
      panelClass = ['mat-toolbar', 'mat-warn'];
    }

    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: panelClass,
    });
  }
}
