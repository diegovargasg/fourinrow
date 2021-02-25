import { GameDataInterface } from "../interfaces/Game.data.interface";
import { GameInterface } from "../interfaces/Game.interface";

const dataFactory = (): GameDataInterface => ({
  players: new Array(),
  started: false,
  config: [],
});

export class Game implements GameInterface {
  _id: string;
  _data: GameDataInterface;

  constructor(id: string, data: GameDataInterface = dataFactory()) {
    this._id = id;
    this._data = data;
  }

  get data(): GameDataInterface {
    return this._data;
  }

  get id(): string {
    return this._id;
  }

  create(): void {}
  destroy(): void {}
}
