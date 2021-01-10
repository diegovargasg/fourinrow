import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  joinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameService: GameService,
    private playerService: PlayerService
  ) {
    this.joinForm = formBuilder.group({
      name: ['', Validators.required],
      gameId: ['', Validators.required],
    });
  }

  onSubmit() {
    const gameId = this.joinForm.value.gameId;
    const playerName = this.joinForm.value.name;
    this.playerService.createPlayer(playerName, gameId);
    this.gameService.joinGame(gameId);
    this.router.navigate(['/waiting']);
  }

  ngOnInit(): void {}
}
