import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectionService } from '../connection/connection.service';
import { GameService } from '../game/game.service';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private game: GameService,
    private player: PlayerService
  ) {
    this.createForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    this.connectionService.connect();
    this.game.id = Math.random().toString(36).substr(2, 6);
    this.player.name = this.createForm.value.name;
    this.connectionService.createGame(this.game, this.player);
    this.connectionService.createGame();
    this.router.navigate(['/waiting']);
  }

  ngOnInit(): void {}
}
