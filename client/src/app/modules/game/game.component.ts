import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionService } from 'src/app/core/connection/connection.service';
import { ConnectionSocketService } from 'src/app/core/connection/connection.socket.service';
import { Player } from 'src/app/core/models/player.model';
import { GameService } from 'src/app/core/services/game.service';
import { NewGameService } from 'src/app/core/services/new-game.service';
import { PlayerService } from 'src/app/core/services/player.service';

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
  isGameEnded = false;
  action: string = '';

  subscription: Subscription;
  allPlayers: Player[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newGameService: NewGameService,
    private gameService: GameService,
    private playerService: PlayerService
  ) {
    if (
      this.newGameService.playerName == '' ||
      this.newGameService.gameId == ''
    ) {
      this.router.navigate(['/']);
    }

    this.playerService.createPlayer(
      this.newGameService.playerName,
      this.newGameService.gameId
    );

    const action = this.activatedRoute.snapshot.paramMap.get('action');
    if (action === 'create') {
      this.gameService.createGame(this.newGameService.gameId);
      const selfPlayer: Player = {
        _id: '',
        _data: {
          name: this.newGameService.playerName,
          ready: false,
          gameId: this.newGameService.gameId,
        },
      };
      //We do not emit allPlayersByGameId when the user is creating the game.
      //Is not necessary as the only player is the creator and we waste one message
      this.allPlayers.push(selfPlayer);
    } else if (action === 'join') {
      this.gameService.joinGame(this.newGameService.gameId);
    }

    this.subscription = this.gameService.allPlayersByGameId.subscribe(
      (allPlayers) => {
        console.log('AllPlayers in Waiting Component');
        console.log(allPlayers);
        this.allPlayers = allPlayers;
      }
    );

    this.subscription = this.gameService.isGameStarted.subscribe(
      (isStarted) => {
        console.log('game is started');
        this.isGameStarted = isStarted;
      }
    );
  }

  onReady() {
    this.playerService.setPlayerReady();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    console.log('ondestroy Game');
    this.subscription.unsubscribe();
  }
}
