require("dotenv").config();

const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 1000,
});

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

const app = require("express")();
const server = require("http").createServer(app);
const port = process.env.PORT || "5000";
const options = {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(server, options);

//Run when client connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("createGame", async (data) => {
    const { game, player } = data;
    console.log("Game Created", game);
    redisClient.set("gameId", "{'id':1234}");
  });

  socket.on("joinGame", async (data) => {
    console.log("user joined", data);
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected", socket.id);
  });
});

//Runs server
server.listen(port, async () => {
  try {
    console.log(`Server running in ${port}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = server;
