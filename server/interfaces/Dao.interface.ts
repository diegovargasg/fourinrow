import { Game } from "../models/Game";
import { Player } from "../models/Player";

export interface DAOInterface {
  init(): void;
  saveGame(game: Game): void;
  savePlayer(player: Player): void;
  deleteGame(game: Game): void;
  deletePlayer(player: Player): void;
  updateGame(game: Game): void;
  updatePlayer(player: Player): void;
  getAllGames(): Game[];
  getAllPlayers(): Player[];
  getGameById(gameId: string): Game;
  getPlayerById(playerId: string): Player;
}
