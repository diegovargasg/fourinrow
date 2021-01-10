import { Player } from './player.model';

export interface Game {
  id: string;
  data: {
    started: boolean;
    players: Player[];
    config: {};
  };
}
