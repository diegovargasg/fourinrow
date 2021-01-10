export interface Player {
  id: string;
  data: {
    name: string;
    ready: boolean;
    gameId: string;
  };
}
