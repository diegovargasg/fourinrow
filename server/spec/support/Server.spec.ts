import "reflect-metadata";
import jasmine from "jasmine";
import { Game } from "../../models/Game";
import { DAORedis } from "../../services/Dao.redis.service";
import { DAO } from "../../models/Dao";
import { container } from "tsyringe";

container.register("DAOService", {
  useClass: DAO,
});

const dao = container.resolve(DAORedis);
dao.init();

beforeEach(async function () {
  //await someLongSetupFunction();
});

beforeAll(async function () {});

it("creates a game", async function () {
  const game = new Game("123456");
  const gameTwo = new Game("123456");
  const result = await dao.createGame(game);
  expect(game).toEqual(gameTwo);
});

/*it("creates a player", async function () {
  const player = await createGame();
  expect(player).toEqual(PlayerObject);
});

it("joins a game", async function () {
  await joinGame(gameId, playerName);
  gameObject = await getGame(gameId);
  await expect(gameObject).toContains(PlayerObject);
});

it("set a player ready", async function () {
  await playerReady(gameId, playerId);
  gameObject = await getGame(gameId);
  playerObject = await getPlayerById(playerId);
  await expect(playerObject.isReady).toBe(true);
});*/
