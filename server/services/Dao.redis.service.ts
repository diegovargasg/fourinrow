import { DAOInterface } from "../interfaces/Dao.interface";
import { inject, singleton } from "tsyringe";
import * as redis from "redis";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { promisify } from "util";
import { GameDataInterface } from "../interfaces/Game.data.interface";

@singleton()
export class DAORedis implements DAOInterface {
  private redisClient = <redis.RedisClient>{};
  private redisAsyncGet: any;
  private redisAsyncSet: any;

  constructor(@inject("DAOService") private DAO: DAOInterface) {}

  init() {
    this.redisClient = redis.createClient({
      host: process.env.DAO_HOST,
      port: parseInt(process.env.DAO_PORT || "6379", 10),
      retry_strategy: () => 1000,
    });

    this.redisClient.on("error", function (err: any) {
      console.log("Error on Connection" + err);
    });

    this.redisAsyncGet = promisify(this.redisClient.get).bind(this.redisClient);
    this.redisAsyncSet = promisify(this.redisClient.set).bind(this.redisClient);
  }

  deleteGame(gameId: string): void {
    console.log(`Deleted Game: ${gameId}`);
    this.redisClient.del(gameId);
  }
  deletePlayer(playerId: string): void {
    console.log(`Deleted player: ${playerId}`);
    this.redisClient.del(playerId);
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

  createGame(game: Game) {
    console.log(`Game saved ${game.id}`);
    const gameData = JSON.stringify(game.data);
    this.redisClient.set(game.id, gameData);
  }

  async joinGame(gameId: string, playerId: string) {
    console.log(`Player ${playerId} joined Game ${gameId}`);
    let gameData: GameDataInterface = JSON.parse(
      await this.redisAsyncGet(gameId)
    );
    const currentPlayers = gameData.players;

    if (!currentPlayers.includes(playerId)) {
      currentPlayers.push(playerId);
    }
    gameData.players = currentPlayers;
    console.log(`Game final data ${JSON.stringify(gameData)}`);
    this.redisClient.set(gameId, JSON.stringify(gameData));
  }

  async getGameById(gameId: string): Promise<Game> {
    const gameData: GameDataInterface = JSON.parse(
      await this.redisAsyncGet(gameId)
    );
    const game = new Game(gameId, gameData);
    return game;
  }

  getPlayerById(playerId: string): Player {
    throw new Error("Method not implemented.");
  }

  createPlayer(player: Player) {
    console.log(`Player ${player._id} Saved`);
    this.redisClient.set(player._id, JSON.stringify(player.data));
  }
}
