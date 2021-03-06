import { PlayerDataInterface } from "./Player.data.interface";

export interface PlayerInterface {
  _id: string;
  _data: PlayerDataInterface;
  create(): void;
  destroy(): void;
}
