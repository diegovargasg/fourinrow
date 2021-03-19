import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewGameService } from 'src/app/core/services/new-game.service';

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
    private activatedRoute: ActivatedRoute,
    private newGameService: NewGameService
  ) {
    const gameIdUrl = this.activatedRoute.snapshot.paramMap.get('gameId');

    this.joinForm = formBuilder.group({
      name: ['', Validators.required],
      gameId: [gameIdUrl, Validators.required],
    });
  }

  onSubmit() {
    const gameId = this.joinForm.value.gameId;
    const playerName = this.joinForm.value.name;
    this.newGameService.id = gameId;
    this.newGameService.playerName = playerName;
    this.router.navigate(['/game/join']);
  }

  ngOnInit(): void {}
}
