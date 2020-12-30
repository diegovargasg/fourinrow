import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection/connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../game/game.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  joinForm: FormGroup;

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private game: GameService,
    private player: PlayerService
  ) {
    this.joinForm = formBuilder.group({
      name: ['', Validators.required],
      gameId: ['', Validators.required],
    });
  }

  onSubmit() {
    this.connectionService.connect();
    const gameId = this.joinForm.value.gameId;
    const playerName = this.joinForm.value.name;
    this.connectionService.createPlayer(playerName, gameId);
    this.connectionService.joinGame(gameId);
    this.router.navigate(['/waiting']);
  }

  ngOnInit(): void {}
}
