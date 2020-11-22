import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Player } from '../models/player';
import { Game } from '../models/game';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {
  joinForm: FormGroup;

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder
  ) {
    this.joinForm = formBuilder.group({
      player: formBuilder.group(new Player()),
      game: formBuilder.group(new Game()),
    });
  }

  onJoin() {
    this.connectionService.connect();
  }

  onSubmit() {
    const formValues: {} = Object.assign({}, this.joinForm.value);
    console.log(formValues);
  }

  ngOnInit(): void {}
}
