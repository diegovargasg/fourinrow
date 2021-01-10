import { Component, OnInit } from '@angular/core';
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
  subscription: Subscription;
  allPlayers: Player[] = [];

  constructor(
    private router: Router,
    private gameService: GameService,
    private playerService: PlayerService
  ) {
    console.log(this.gameService.id);
    console.log(this.playerService.id);
    if (this.gameService.id == '' || this.playerService.id == '') {
      console.log('should enter here');
      this.router.navigate(['/']);
    }

    this.subscription = this.gameService.allPlayersByGameId.subscribe(
      (allPlayers) => {
        console.log('AllPlayers in Waiting Component');
        console.log(allPlayers);
        this.allPlayers = allPlayers;
      }
    );
  }

  ngOnInit(): void {
    this.gameService.getAllPlayersByGameId(this.gameService.id);
  }

  ngOnDestroy() {
    console.log('ondestroy waiting');
    this.gameService.destroyGame();
    this.playerService.destroyPlayer();
    this.subscription.unsubscribe();
  }
}
