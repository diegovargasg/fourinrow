export interface PlayerInterface {
  _id: string;
  _name: string;
  create(): void;
  destroy(): void;
  id(): string;
  name(): string;
}
