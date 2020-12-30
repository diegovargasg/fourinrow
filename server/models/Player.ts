import { PlayerDataInterface } from "../interfaces/Player.data.interface";
import { PlayerInterface } from "../interfaces/Player.interface";

export class Player implements PlayerInterface {
  readonly _id: string;
  readonly _name: string;
  _data: PlayerDataInterface;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._data = {
      name: this._name,
      ready: false,
      gameId: "",
    };
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }

  get data(): PlayerDataInterface {
    return this._data;
  }

  create() {}

  destroy() {}
}
