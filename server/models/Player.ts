import { PlayerDataInterface } from "../interfaces/Player.data.interface";
import { PlayerInterface } from "../interfaces/Player.interface";

const dataFactory = (): PlayerDataInterface => ({
  name: "",
  ready: false,
  gameId: "",
});

export class Player implements PlayerInterface {
  readonly _id: string;
  _data: PlayerDataInterface;

  constructor(
    id: string,
    name: string,
    data: PlayerDataInterface = dataFactory()
  ) {
    this._id = id;
    this._data = data;
    this._data.name = name;
  }

  get id(): string {
    return this._id;
  }

  get data(): PlayerDataInterface {
    return this._data;
  }

  create() {}

  destroy() {}
}
