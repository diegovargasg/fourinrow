import { ServerInterface } from "../interfaces/Server.interface";
import { GameDataInterface } from "../interfaces/Game.data.interface";
import express from "express";
import http from "http";
import { inject, singleton } from "tsyringe";
import { Server, Socket } from "socket.io";
import { DAOInterface } from "../interfaces/Dao.interface";
import { Player } from "../models/Player";
import { Game } from "../models/Game";
import { DaoConstInterface } from "../interfaces/Dao.const.interface";

const socketOptions = {
  cors: {
    origin: process.env.WEB_HOST || "http://localhost:4200",
    methods: ["GET", "POST"],
  },
};

const serverPort = process.env.PORT || "5000";

@singleton()
export class ServerWebsockets {
  app: any;
  httpServer: http.Server;
  io: Server;
  dao = <DAOInterface>{};
  game = <Game>{};
  player = <Player>{};

  constructor(@inject("ServerService") private server: ServerInterface) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.io = new Server(this.httpServer, socketOptions);
  }

  init(dao: DAOInterface, daoConst: DaoConstInterface) {
    this.dao = dao;

    //Run when client connects
    this.io.on("connection", (socket: Socket) => {
      const playerId: string = socket.id;
      console.log(`Player connected ${playerId}`);

      const emitAllPlayers = async (gameId: string) => {
        const allPlayers = await this.dao.getAllPlayersByGameId(gameId);
        console.log(
          `All players by gameId ${gameId} ${JSON.stringify(allPlayers)}`
        );
        this.io.to(gameId).emit("getAllPlayersByGameId", allPlayers);
      };

      const emitStartGame = async (gameId: string) => {
        console.log(
          `To all players from gameId ${gameId} emit that game should start`
        );
        this.io.to(gameId).emit("startGame", true);
      };

      socket.on(
        "createGame",
        async (data: { gameId: string; gameData: GameDataInterface }) => {
          const { gameId, gameData } = data;
          const newGame = new Game(gameId);
          newGame.data = gameData;
          console.log(`Game before player Pushed ${JSON.stringify(newGame)}`);
          newGame.data.players.push(playerId);
          console.log(`Game before saved ${JSON.stringify(newGame)}`);
          const isGameCreated = await this.dao.createGame(newGame);
          console.log("isGameCreated", isGameCreated);
          if (isGameCreated === daoConst.true) {
            socket.emit("gameCreated", true);
          }
        }
      );

      socket.on(
        "createPlayer",
        async (data: { playerName: string; gameId: string }) => {
          const { playerName, gameId } = data;
          console.log(`Create Data Player`, { playerName, gameId });
          const newPlayer = new Player(playerId, playerName);
          newPlayer._data.gameId = gameId;
          console.log(`Create Player ${JSON.stringify(newPlayer)}`);
          this.dao.createPlayer(newPlayer);
          socket.join(gameId);
        }
      );

      socket.on("joinGame", async (data: { gameId: string }) => {
        const playerId: string = socket.id;
        const { gameId } = data;
        await this.dao.joinGame(gameId, playerId);
        const game = await this.dao.getGameById(gameId);
        socket.emit("gameData", game?._data);
        socket.emit("gameCreated", true);
        emitAllPlayers(gameId);
      });

      socket.on("getAllPlayersByGameId", async (data: { gameId: string }) => {
        const { gameId } = data;
        emitAllPlayers(gameId);
      });

      socket.on("disconnect", async () => {
        console.log(`Player disconnected ${playerId}`);
        const player = await this.dao.getPlayerById(playerId);
        if (player === null) {
          throw "Player does not exist";
        }
        const gameId = player._data.gameId;
        const result = await this.dao.deletePlayer(playerId);
        console.log(`result deleting player ${result}`);

        const game = await this.dao.getGameById(gameId);
        if (game === null) {
          throw "Game does not exist";
        }

        //If a player leaves a started game
        //delete all players from such game and game itself
        if (game._data.started) {
          const gamePlayers = await this.dao.getAllPlayersByGameId(gameId);
          for (const key in gamePlayers) {
            const player = gamePlayers[key];
            await this.dao.deletePlayer(player._id);
          }
          await this.dao.deleteGame(gameId);
          //TODO: Emit go back to home
        } else {
          emitAllPlayers(gameId);
        }
      });

      socket.on("goToNextRound", async (data: { gameId: string }) => {
        const { gameId } = data;
        console.log("someone went to next round " + gameId);
        socket.to(gameId).emit("goToNextRound", true);
      });

      socket.on(
        "setPlayerReady",
        async (data: { playerId: string; gameId: string; ready: boolean }) => {
          const { playerId, gameId, ready } = data;
          console.log(`set player ${playerId} ready as ${ready}`);
          await this.dao.setPlayerReady(playerId, gameId, ready);
          const player = await this.dao.getPlayerById(playerId);
          if (player === null) {
            throw "Player does not exist";
          }
          console.log(
            `Player ${playerId} data ${JSON.stringify(player._data)}`
          );
          emitAllPlayers(gameId);
          const areAllPlayersReady = await dao.areAllPlayersReady(gameId);

          if (areAllPlayersReady) {
            emitStartGame(gameId);
          }
        }
      );

      socket.on("stopGame", async (data: { gameId: string }) => {
        const { gameId } = data;
        console.log(`Game ${gameId} stopped`);
        this.io.to(gameId).emit("stopGame", true);
      });

      socket.on(
        "updateResults",
        async (data: { gameId: string; gameResults: Array<boolean> }) => {
          const { gameId, gameResults } = data;
          const playerId: string = socket.id;
          console.log("PlayerId", playerId);
          const player = await dao.getPlayerById(playerId);
          if (player === null) {
            throw "Player does not exist";
          }
          player._data.results = gameResults;
          await dao.updatePlayer(player);
          emitAllPlayers(gameId);
        }
      );
    });

    this.httpServer.listen(serverPort, async () => {
      try {
        console.log(`Servers running in ${serverPort}`);
      } catch (error) {
        console.log(error);
      }
    });
  }

  createGame() {}

  destroy() {
    console.log("destroyed in Websockets");
  }
}
