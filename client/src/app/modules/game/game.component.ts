import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionService } from 'src/app/core/connection/connection.service';
import { ConnectionSocketService } from 'src/app/core/connection/connection.socket.service';
import { Player } from 'src/app/core/models/player.model';
import { GameService } from 'src/app/core/services/game.service';
import { NewGameService } from 'src/app/core/services/new-game.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { GameDataModel } from '../../core/models/gameData.model';
import { gameDataModelFactory } from '../../core/models/gameDataFactory.model';
import { ResultComponent } from '../../modules/game/result/result.component';
import { MatDialog } from '@angular/material/dialog';
import copy from 'copy-text-to-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [
    { provide: ConnectionService, useClass: ConnectionSocketService },
    GameService,
    PlayerService,
  ],
})
export class GameComponent {
  //isGameFinished = false;
  action: string = '';
  isActualPlayerReady = false;

  //subscription: Subscription;
  //allPlayers: Player[] = [];
  //gameData: GameDataModel = gameDataModelFactory();
  resultsDialogRef: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newGameService: NewGameService,
    public gameService: GameService,
    private playerService: PlayerService,
    public resultsDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    if (this.newGameService.playerName == '' || this.newGameService.id == '') {
      this.router.navigate(['/']);
    }

    this.playerService.createPlayer(
      this.newGameService.playerName,
      this.newGameService.id
    );

    const action = this.activatedRoute.snapshot.paramMap.get('action');
    if (action === 'create') {
      this.gameService.createGame(
        this.newGameService.id,
        this.newGameService.data
      );
      this.gameService.gameData = this.newGameService.data;
      const selfPlayer: Player = {
        _id: '',
        _data: {
          name: this.newGameService.playerName,
          ready: false,
          gameId: this.newGameService.id,
          results: new Array(),
        },
      };
      //We do not emit allPlayersByGameId when the user is creating the game.
      //Is not necessary as the only player is the creator and we waste one message
      this.gameService.allPlayers.push(selfPlayer);
    } else if (action === 'join') {
      this.gameService.joinGame(this.newGameService.id);
    }

    /*this.subscription = this.gameService.allPlayersByGameId.subscribe(
      (allPlayers) => {
        this.allPlayers = allPlayers;
        if (this.isGameFinished && this.resultsDialogRef) {
          this.resultsDialogRef.componentInstance.data = {
            allPlayers: this.allPlayers,
          };
        }
      }
    );*/

    /*this.subscription = this.gameService.gameFinishedObserver.subscribe(() => {
      this.resultsDialogRef = this.resultsDialog.open(ResultComponent, {
        disableClose: true,
        data: { allPlayers: this.gameService.allPlayers },
        width: '50vw',
      });
    });*/
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

  ngOnInit(): void {}

  ngOnDestroy() {
    console.log('ondestroy Game');
    //this.subscription.unsubscribe();
  }
}
