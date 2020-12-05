import dotenv from "dotenv";
dotenv.config();

export const Config = {
  socketOptions: {
    cors: {
      origin: process.env.SERVER_ALLOW_ORIGIN,
      methods: ["GET", "POST"],
    },
  },
  serverPort: process.env.SERVER_PORT || "5000",
  redisHost: process.env.REDIS_HOST,
  redisPort: 6379, //process.env.REDIS_PORT
};
