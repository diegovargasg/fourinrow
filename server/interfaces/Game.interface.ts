import { GameDataInterface } from "./Game.data.interface";

export interface GameInterface {
  _id: string;
  id(): string;
  create(): void;
  destroy(): void;
  _data: GameDataInterface;
  data(): GameDataInterface;
}
