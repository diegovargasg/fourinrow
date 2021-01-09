import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService implements Player {
  constructor() {}
  id: string = '';
  name: string = '';
}
