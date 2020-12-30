import jasmine from "jasmine";

beforeEach(async function() {
  //await someLongSetupFunction();
});

it('creates a game', async function() {
  const game = await createGame();
  expect(game).toEqual(GameObject);
});

it('creates a player', async function() {
  const player = await createGame();
  expect(player).toEqual(PlayerObject);
});

it('joins a game', async function() {
  await joinGame(gameId, playerName);
  gameObject = await getGame(gameId);
  await expect(gameObject).toContains(PlayerObject);
});

it('set a player ready', async function() {
  await playerReady(gameId, playerId);
  gameObject = await getGame(gameId);
  playerObject = await getPlayerById(playerId);
  await expect(playerObject.isReady).toBe(true);
});
