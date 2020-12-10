import { GameDataInterface } from "./Game.data.interface";

export interface GameInterface {
  _id: string;
  _data: GameDataInterface;
  create(): void;
  destroy(): void;
}
