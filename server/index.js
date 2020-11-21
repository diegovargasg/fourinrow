const express = require("express");
const _ = require("lodash");
const cors = require("cors");
const port = process.env.PORT || "5000";
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

//Run when client connects
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", async () => {
    console.log("User disconnected");
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
