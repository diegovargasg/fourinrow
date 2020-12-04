import express from "express";
import http from "http";

require("dotenv").config();

const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 1000,
});

redisClient.on("errors", function (err: any) {
  console.log("Error + err");
});

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "5000";
const options = {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(server, options);

//Run when client connects
io.on("connection", (socket: any) => {
  console.log("User connected: ", socket.id);

  socket.on("create_Game", async (data: any) => {
    const { game, player } = data;
    console.log("Game Created", game);
    redisClient.set("gameId", "{'id':1234s5}");
  });

  socket.on("joinGame", async (data: any) => {
    console.log("user joined", data);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected", socket.id);
  });
});

//Runs server
server.listen(port, async () => {
  try {
    console.log(`Servers running in   ${port}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = server;
