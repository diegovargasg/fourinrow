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
    console.log("Game Created", data);
  });

  socket.on("joinGame", async (data) => {
    console.log("Game Created", data);
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
