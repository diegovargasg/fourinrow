import { Injectable } from '@angular/core';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService extends Game {
  constructor() {
    super();
  }
}
