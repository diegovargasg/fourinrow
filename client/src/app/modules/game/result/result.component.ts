import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  allPlayers: Player[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Player[]) {}

  ngOnInit(): void {}
}
