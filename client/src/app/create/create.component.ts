import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection/connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  player = new Player();
  game = new Game();

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    try {
      const connection = await this.connectionService.connect();
      this.game.id = Math.random().toString(36).substr(2, 6);
      this.player.id = connection.id;
      this.player.name = this.createForm.value.name;
      await this.connectionService.createGame(this.game, this.player);
      this.router.navigate(['/waiting']);
    } catch (e) {}
  }
}
