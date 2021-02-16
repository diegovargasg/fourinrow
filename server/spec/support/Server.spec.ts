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

it("deletes a player", async function () {
  await dao.createGame(new Game("game123"));
  await dao.createPlayer(new Player("player123", "Diego"));
  const joinGameResult = await dao.joinGame("game123", "player123");
  const game = await dao.getGameById("game123");
  const player = await dao.getPlayerById("player123");

  if (player === null) {
    throw "player does not exist";
  }

  expect(joinGameResult).toEqual("OK");
  expect(game._data.players).toContain("player123");
  expect(player._data.gameId).toEqual("game123");

  await dao.deletePlayer("player123");
  const playerNull = await dao.getPlayerById("player123");
  const gameAfterPlayerDeleted = await dao.getGameById("game123");
  expect(gameAfterPlayerDeleted._data.players).not.toContain("player123");
  expect(playerNull).toEqual(null);
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
  if (player === null) {
    throw "player does not exist";
  }
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
    if (savedPlayer === null) {
      throw "player does not exist";
    }
    expect(player).toEqual(savedPlayer);
  }
}, 5000);

it("set a player as ready", async function () {
  await dao.createPlayer(new Player("player123", "Diego"));
  await dao.setPlayerReady("player123", "game123", true);
  const player = await dao.getPlayerById("player123");
  if (player === null) {
    throw "player does not exist";
  }
  console.log(`Player with ready as true == ${player._data.ready}`);
  expect(player._data.ready).toBe(true);
});

it("sets a game as in progress", async function () {
  await dao.createGame(new Game("game123"));
  await dao.setGameInProgress("game123", true);

  const game = await dao.getGameById("game123");
  expect(game._data.started).toBe(true);
});

it("checks if all players of a game are ready", async function () {
  await dao.createGame(new Game("game123"));

  await dao.createPlayer(new Player("player123", "Diego"));
  await dao.joinGame("game123", "player123");
  await dao.setPlayerReady("player123", "game123", true);

  await dao.createPlayer(new Player("player456", "Camilo"));
  await dao.joinGame("game123", "player456");
  await dao.setPlayerReady("player456", "game123", true);

  const areAllPlayerReady = await dao.areAllPlayersReady("game123");

  expect(areAllPlayerReady).toBe(true);
});

it("checks a game is started", async function () {
  await dao.createGame(new Game("game123"));

  await dao.createPlayer(new Player("player123", "Diego"));
  await dao.joinGame("game123", "player123");
  await dao.setPlayerReady("player123", "game123", true);

  await dao.createPlayer(new Player("player456", "Camilo"));
  await dao.joinGame("game123", "player456");
  await dao.setPlayerReady("player456", "game123", true);

  const areAllPlayersReady = dao.areAllPlayersReady("game123");
  if (areAllPlayersReady) {
    const game = await dao.getGameById("game123");
    game._data.started = true;
    await dao.updateGame(game);
  }

  const game = await dao.getGameById("game123");
  if (game === null) {
    throw "Game does not exist";
  }
  expect(game._data.started).toBe(true);
});

/*it("checks if game and player were deleted after player leaves started game", async function () {
  await dao.createGame(new Game("game123"));

  await dao.createPlayer(new Player("player123", "Diego"));
  await dao.joinGame("game123", "player123");
  await dao.setPlayerReady("player123", "game123", true);

  await dao.createPlayer(new Player("player456", "Camilo"));
  await dao.joinGame("game123", "player456");
  await dao.setPlayerReady("player456", "game123", true);
});*/
