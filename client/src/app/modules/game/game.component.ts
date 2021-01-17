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
export class GameComponent implements OnInit {
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

    const action = this.activatedRoute.snapshot.paramMap.get('action');
    console.log('action!!!', action);
    if (action === 'create') {
      console.log('CREATE!');
      this.gameService.createGame(this.newGameService.gameId);
    } else if (action === 'join') {
      console.log('JOIN!');
      this.gameService.joinGame(this.newGameService.gameId);
    }

    this.playerService.createPlayer(
      this.newGameService.playerName,
      this.newGameService.gameId
    );

    this.subscription = this.gameService.allPlayersByGameId.subscribe(
      (allPlayers) => {
        console.log('AllPlayers in Waiting Component');
        console.log(allPlayers);
        this.allPlayers = allPlayers;
      }
    );
  }

  onReady() {
    this.isGameStarted = !this.isGameStarted;
  }

  ngOnInit(): void {
    console.log('oninit Game');
    setTimeout(() => {
      this.gameService.getAllPlayersByGameId(this.gameService.id);
    }, 1000);
  }

  ngOnDestroy() {
    console.log('ondestroy Game');
    this.subscription.unsubscribe();
  }
}
