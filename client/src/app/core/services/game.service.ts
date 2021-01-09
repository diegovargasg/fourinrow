import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService implements Game {
  constructor() {}
  id: string = '';
}
