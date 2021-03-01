export interface Player {
  _id: string;
  _data: {
    name: string;
    ready: boolean;
    gameId: string;
    results: Array<boolean>;
  };
}
