import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewGameService } from 'src/app/core/services/new-game.service';

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
    private newGameService: NewGameService
  ) {
    this.createForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    const gameId = Math.random().toString(36).substr(2, 6);
    const playerName = this.createForm.value.name;

    this.newGameService.gameId = gameId;
    this.newGameService.playerName = playerName;
    this.router.navigate(['/game/create']);
  }

  ngOnInit(): void {}
}
