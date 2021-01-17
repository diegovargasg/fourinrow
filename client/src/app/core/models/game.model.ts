import { Player } from './player.model';

export interface Game {
  _id: string;
  _data: {
    started: boolean;
    players: Player[];
    config: {};
  };
}
