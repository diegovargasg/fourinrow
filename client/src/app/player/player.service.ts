import { Injectable } from '@angular/core';
import { Player } from '../player/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends Player {
  constructor() {
    super();
  }
}
