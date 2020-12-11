import { Game } from "../models/Game";
import { Player } from "../models/Player";

export interface DAOInterface {
  init(): void;
  createGame(game: Game): void;
  createPlayer(player: Player): void;
  joinGame(gameId: string, playerId: string): void;
  deleteGame(game: Game): void;
  deletePlayer(player: Player): void;
  updateGame(game: Game): void;
  updatePlayer(player: Player): void;
  getAllGames(): Game[];
  getAllPlayers(): Player[];
  getGameById(gameId: string): Game | Promise<Game>;
  getPlayerById(playerId: string): Player;
}