import "reflect-metadata";
import jasmine from "jasmine";
import { Game } from "../../models/Game";

import { DAORedis } from "../../services/Dao.redis.service";
import { DAO } from "../../models/Dao";
import { container } from "tsyringe";
import { Player } from "../../models/Player";

container.register("DAOService", {
  useClass: DAO,
});

const dao = container.resolve(DAORedis);
dao.init();

beforeEach(async function () {
  await dao.flush();
});

it("creates a game", async function () {
  const game = new Game("game123");
  const result = await dao.createGame(game);
  expect(result).toEqual("OK");
}, 5000);

it("creates a player", async function () {
  const player = new Player("player123", "Diego");
  const result = await dao.createPlayer(player);
  expect(result).toEqual("OK");
}, 5000);

it("gets a game", async function () {
  await dao.createGame(new Game("game123"));
  const savedGame = await dao.getGameById("game123");
  const newGame = new Game("game123");
  expect(savedGame).toEqual(newGame);
}, 5000);

it("gets a player", async function () {
  await dao.createPlayer(new Player("player123", "Diego"));
  const savedPlayer = await dao.getPlayerById("player123");
  const newPlayer = new Player("player123", "Diego");
  expect(savedPlayer).toEqual(newPlayer);
}, 5000);

it("joins a game", async function () {
  await dao.createGame(new Game("game123"));
  await dao.createPlayer(new Player("player123", "Diego"));
  const joinGameResult = await dao.joinGame("game123", "player123");
  const game = await dao.getGameById("game123");
  const player = await dao.getPlayerById("player123");
  expect(joinGameResult).toEqual("OK");
  expect(game._data.players).toContain("player123");
  expect(player._data.gameId).toEqual("game123");
}, 5000);

it("get all players of a game", async function () {
  await dao.createGame(new Game("game123"));
  await dao.createPlayer(new Player("player123", "Diego"));
  await dao.joinGame("game123", "player123");
  await dao.createPlayer(new Player("player456", "Camilo"));
  await dao.joinGame("game123", "player456");
  const allPlayers = await dao.getAllPlayersByGameId("game123");
  for (const player of allPlayers) {
    const savedPlayer = await dao.getPlayerById(player._id);
    expect(player).toEqual(savedPlayer);
  }
}, 5000);

it("set a player as ready", async function () {
  await dao.createPlayer(new Player("player123", "Diego"));
  await dao.setPlayerReady("player123", "game123", true);
  const player = await dao.getPlayerById("player123");
  console.log(`Player with ready as true == ${player._data.ready}`);
  expect(player._data.ready).toBe(true);
});
