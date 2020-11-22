import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection/connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Player } from '../models/player';
import { Game } from '../models/game';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  joinForm: FormGroup;
  player = new Player();
  game = new Game();

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.joinForm = formBuilder.group({
      name: ['', Validators.required],
      gameId: ['', Validators.required],
    });
  }

  onJoin() {
    this.connectionService.connect();
  }

  async onSubmit() {
    try {
      const connection = await this.connectionService.connect();
      this.game.id = this.joinForm.value.gameId;
      this.player.name = this.joinForm.value.name;
      this.player.id = connection.id;
      await this.connectionService.createGame(this.game, this.player);
      this.router.navigate(['/waiting']);
    } catch (e) {}
  }

  ngOnInit(): void {}
}
