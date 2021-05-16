import "reflect-metadata";
import { Server } from "../models/Server";
import { ServerWebsockets } from "../services/Server.websockets.service";
import { DAO } from "../models/Dao";
import { DAORedis } from "../services/Dao.redis.service";
import { redisDaoConst } from "../Dao.constants";
import { container } from "tsyringe";

container.register("DAOService", {
  useClass: DAO,
});
container.register("ServerService", {
  useClass: Server,
});

const dao = container.resolve(DAORedis);
dao.init();

const server = container.resolve(ServerWebsockets);
server.init(dao, redisDaoConst);
