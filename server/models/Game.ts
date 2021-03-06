import { GameDataInterface } from "../interfaces/Game.data.interface";
import { GameInterface } from "../interfaces/Game.interface";

const dataFactory = (): GameDataInterface => ({
  players: new Array(),
  started: false,
  config: new Array(),
  rounds: 5,
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

  set data(data: GameDataInterface) {
    this._data = data;
  }

  get id(): string {
    return this._id;
  }

  create(): void {}
  destroy(): void {}
}
