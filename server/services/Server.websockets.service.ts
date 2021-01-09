import { ServerInterface } from "../interfaces/Server.interface";
import { GameDataInterface } from "../interfaces/Game.data.interface";
import express from "express";
import http from "http";
import { inject, singleton } from "tsyringe";
import { Server, Socket } from "socket.io";
import { DAOInterface } from "../interfaces/Dao.interface";
import { Player } from "../models/Player";
import { Game } from "../models/Game";

const socketOptions = {
  cors: {
    origin: process.env.SERVER_ALLOW_ORIGIN,
    methods: ["GET", "POST"],
  },
};

const serverPort = process.env.SERVER_PORT || "5000";

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

  init(dao: DAOInterface) {
    this.dao = dao;

    //Run when client connects
    this.io.on("connection", (socket: Socket) => {
      const playerId: string = socket.id;
      console.log(`Player connected ${playerId}`);

      socket.on("createGame", async (data: { gameId: string }) => {
        const { gameId } = data;
        const game = new Game(gameId);
        game.data.players.push(playerId);
        this.dao.createGame(game);
      });

      socket.on(
        "createPlayer",
        async (data: { playerName: string; gameId: string }) => {
          const { playerName, gameId } = data;
          const player = new Player(playerId, playerName);
          player._data.gameId = gameId;
          this.dao.createPlayer(player);
          socket.join(gameId);
        }
      );

      socket.on("joinGame", async (data: { gameId: string }) => {
        const playerId: string = socket.id;
        const { gameId } = data;
        await this.dao.joinGame(gameId, playerId);
        const allPlayers = await this.dao.getAllPlayersByGameId(gameId);
        console.log(`All players for gameId ${gameId} ${allPlayers}`);
        //this.io.to(gameId).emit("getAllPlayers", allPlayers);
      });

      socket.on("disconnect", async () => {
        console.log(`Player disconnected ${playerId}`);
        this.dao.deletePlayer(playerId);
      });
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
