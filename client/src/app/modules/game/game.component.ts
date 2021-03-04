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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  isGameStarted = false;
  isGameInProgress = false;
  isGameFinished = false;
  action: string = '';
  isActualPlayerReady = false;

  subscription: Subscription;
  allPlayers: Player[] = [];
  gameData: GameDataModel = gameDataModelFactory();
  resultsDialogRef: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newGameService: NewGameService,
    private gameService: GameService,
    private playerService: PlayerService,
    public resultsDialog: MatDialog
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
        this.newGameService.data,
        this.newGameService.rounds
      );
      this.gameData = this.newGameService.data;
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
      this.allPlayers.push(selfPlayer);
    } else if (action === 'join') {
      this.gameService.joinGame(this.newGameService.id);
    }

    this.subscription = this.gameService.allPlayersByGameId.subscribe(
      (allPlayers) => {
        this.allPlayers = allPlayers;
        if (this.isGameFinished && this.resultsDialogRef) {
          this.resultsDialogRef.componentInstance.data = {
            allPlayers: this.allPlayers,
          };
        }
      }
    );

    this.subscription = this.gameService.isGameStarted.subscribe(
      (isStarted) => {
        console.log('game is started');
        this.isGameStarted = isStarted;
      }
    );

    this.subscription = this.gameService.gameData.subscribe(
      (gameData: GameDataModel) => {
        console.log('gameData reveiced from server', gameData);
        this.gameData = gameData;
      }
    );

    this.subscription = this.gameService.isGameFinished.subscribe(
      (isGameFinished: boolean) => {
        this.isGameFinished = isGameFinished;
        this.resultsDialogRef = this.resultsDialog.open(ResultComponent, {
          disableClose: true,
          data: { allPlayers: this.allPlayers },
          width: '500',
        });
      }
    );
  }

  onReady() {
    this.playerService.setPlayerReady();
    this.isActualPlayerReady = this.playerService.ready;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    console.log('ondestroy Game');
    this.subscription.unsubscribe();
  }
}
