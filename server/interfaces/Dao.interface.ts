import { Game } from "../models/Game";
import { Player } from "../models/Player";

export interface DAOInterface {
  init(): void;
  createGame(game: Game): void;
  createPlayer(player: Player): void;
  joinGame(gameId: string, playerId: string): void;
  deleteGame(gameId: string): void;
  deletePlayer(playerId: string): void;
  updateGame(game: Game): void;
  updatePlayer(player: Player): void;
  getAllGames(): Game[];
  getAllPlayers(): Player[];
  getGameById(gameId: string): Game | null | Promise<Game | null>;
  getPlayerById(playerId: string): Player | null | Promise<Player | null>;
  getAllPlayersByGameId(gameId: string): Player[] | Promise<Player[]>;
  setPlayerReady(playerId: string, gameId: string, ready: boolean): void;
  flush(): void;
}
