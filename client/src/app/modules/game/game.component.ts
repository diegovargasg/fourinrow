import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  action: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newGameService: NewGameService,
    public gameService: GameService,
    private playerService: PlayerService
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
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    console.log('ondestroy Game');
  }
}
