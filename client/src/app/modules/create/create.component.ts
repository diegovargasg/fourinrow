import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../../core/services/game.service';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private gameService: GameService,
    private playerService: PlayerService
  ) {
    this.createForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    const gameId = Math.random().toString(36).substr(2, 6);
    const playerName = this.createForm.value.name;
    this.gameService.createGame(gameId);
    this.playerService.createPlayer(playerName, gameId);
    this.router.navigate(['/waiting']);
  }

  ngOnInit(): void {}
}
