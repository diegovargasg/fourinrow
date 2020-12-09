import { PlayerDataInterface } from "./Player.data.interface";

export interface PlayerInterface {
  _id: string;
  _name: string;
  create(): void;
  destroy(): void;
  id(): string;
  name(): string;
  _data: PlayerDataInterface;
  data(): PlayerDataInterface;
}
