import { DAOInterface } from "../interfaces/Dao.interface";
import { Game } from "../models/Game";
import { Player } from "./Player";

export class DAO implements DAOInterface {
  constructor() {}
  joinGame(gameId: string, playerId: string): void {
    throw new Error("Method not implemented.");
  }
  deleteGame(gameId: string): void {
    throw new Error("Method not implemented.");
  }
  deletePlayer(playerId: string): void {
    throw new Error("Method not implemented.");
  }
  updateGame(game: Game): void {
    throw new Error("Method not implemented.");
  }
  updatePlayer(player: Player): void {
    throw new Error("Method not implemented.");
  }
  getAllGames(): Game[] {
    throw new Error("Method not implemented.");
  }
  getAllPlayers(): Player[] {
    throw new Error("Method not implemented.");
  }
  getGameById(gameId: string): Game | Promise<Game> {
    throw new Error("Method not implemented.");
  }
  getPlayerById(playerId: string): Player {
    throw new Error("Method not implemented.");
  }
  init(): void {}
  createGame(game: Game) {
    throw new Error("Method not implemented.");
  }
  createPlayer(player: Player) {
    throw new Error("Method not implemented.");
  }
}
