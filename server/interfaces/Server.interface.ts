export interface ServerInterface {
  init(): void;
  onConnect(): void;
  destroy(): void;
}
