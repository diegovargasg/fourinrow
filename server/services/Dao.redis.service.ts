import { DAOInterface } from "../interfaces/Dao.interface";
import { inject, singleton } from "tsyringe";
import * as redis from "redis";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { promisify } from "util";
import { GameDataInterface } from "../interfaces/Game.data.interface";
import { PlayerDataInterface } from "../interfaces/Player.data.interface";

@singleton()
export class DAORedis implements DAOInterface {
  private redisClient = <redis.RedisClient>{};
  private redisAsyncGet: any;
  private redisAsyncSet: any;
  private redisAsyncDel: any;
  private redisAsyncFlush: any;

  constructor(@inject("DAOService") private DAO: DAOInterface) {}

  init() {
    this.redisClient = redis.createClient({
      host: process.env.DAO_HOST || "localhost",
      port: parseInt(process.env.DAO_PORT || "6379", 10),
      retry_strategy: () => 1000,
    });

    this.redisClient.on("error", function (err: any) {
      console.log("Error on Connection" + err);
    });

    this.redisAsyncGet = promisify(this.redisClient.get).bind(this.redisClient);
    this.redisAsyncSet = promisify(this.redisClient.set).bind(this.redisClient);
    this.redisAsyncDel = promisify(this.redisClient.del).bind(this.redisClient);
    this.redisAsyncFlush = promisify(this.redisClient.flushall).bind(
      this.redisClient
    );
    return this.redisClient;
  }

  deleteGame(gameId: string): void {
    console.log(`Deleted Game: ${gameId}`);
    this.redisClient.del(gameId);
  }
  async deletePlayer(playerId: string) {
    const player = await this.getPlayerById(playerId);
    const gameId = player._data.gameId;
    const game = await this.getGameById(gameId);
    console.log(`Game before deleting player ${JSON.stringify(game)}`);
    let gameData = game._data;

    const indexPlayer: number = gameData.players.indexOf(playerId, 0);
    if (indexPlayer > -1) {
      gameData.players.splice(indexPlayer, 1);
    }

    const updatedGame = new Game(gameId, gameData);

    await this.updateGame(updatedGame);
    await this.redisAsyncDel(playerId);
  }

  async updateGame(game: Game) {
    console.log(`Game after deleting player ${JSON.stringify(game)}`);
    return await this.redisAsyncSet(game._id, JSON.stringify(game._data));
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

  private async getPlayer(playerId: string): Promise<PlayerDataInterface> {
    return JSON.parse(await this.redisAsyncGet(playerId));
  }

  async createGame(game: Game) {
    console.log(`Game saved ${JSON.stringify(game)}`);
    const gameData = JSON.stringify(game.data);
    return await this.redisAsyncSet(game.id, gameData);
  }

  async joinGame(gameId: string, playerId: string) {
    console.log(`Player ${playerId} joined Game ${gameId}`);
    let gameData: GameDataInterface = JSON.parse(
      await this.redisAsyncGet(gameId)
    );

    console.log(`Game initial data ${JSON.stringify(gameData)}`);

    const currentPlayers = gameData.players;

    if (!currentPlayers.includes(playerId)) {
      currentPlayers.push(playerId);
    }
    gameData.players = currentPlayers;
    console.log(`Game final data ${JSON.stringify(gameData)}`);

    let playerData: PlayerDataInterface = JSON.parse(
      await this.redisAsyncGet(playerId)
    );
    playerData.gameId = gameId;
    console.log(`Player final data ${JSON.stringify(playerData)}`);

    const resultPlayerUpdate = await this.redisAsyncSet(
      playerId,
      JSON.stringify(playerData)
    );
    const resultGameUpdate = await this.redisAsyncSet(
      gameId,
      JSON.stringify(gameData)
    );
    return resultGameUpdate === "OK" && resultPlayerUpdate === "OK"
      ? "OK"
      : false;
  }

  async getGameById(gameId: string): Promise<Game> {
    const gameData: GameDataInterface = JSON.parse(
      await this.redisAsyncGet(gameId)
    );
    const game = new Game(gameId, gameData);
    console.log(`getGameById ${JSON.stringify(game)}`);
    return game;
  }

  async getPlayerById(playerId: string): Promise<Player> {
    const playerData: PlayerDataInterface = JSON.parse(
      await this.redisAsyncGet(playerId)
    );
    const player = new Player(playerId, playerData.name, playerData);
    return player;
  }

  async createPlayer(player: Player) {
    console.log(`Player ${JSON.stringify(player)} Saved`);
    return await this.redisAsyncSet(player._id, JSON.stringify(player.data));
  }

  async getAllPlayersByGameId(gameId: string): Promise<Player[]> {
    const game = await this.getGameById(gameId);
    const gamePlayers = game._data.players;
    let allPlayers: Player[] = [];

    for (const playerId of gamePlayers) {
      const player: Player = await this.getPlayerById(playerId);
      allPlayers.push(player);
    }

    return allPlayers;
  }

  async setPlayerReady(playerId: string, gameId: string, ready: boolean) {
    const playerData: PlayerDataInterface = await this.getPlayer(playerId);
    playerData.ready = ready;
    await this.redisAsyncSet(playerId, JSON.stringify(playerData));
  }

  async flush() {
    await this.redisAsyncFlush("ASYNC");
  }
}
