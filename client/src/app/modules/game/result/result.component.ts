import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Player } from '../../../core/models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { allPlayers: Player[] },
    public resultsDialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['/']);
    this.resultsDialog.closeAll();
  }
}
