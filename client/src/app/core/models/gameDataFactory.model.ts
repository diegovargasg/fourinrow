import { GameDataModel } from '../models/gameData.model';

export const gameDataModelFactory = (): GameDataModel => ({
  players: new Array(),
  started: false,
  config: new Array(),
  rounds: 5,
});
