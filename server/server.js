import express from "express";
import { parse } from "url";
import { WebSocketServer } from "ws";
const app = express();

app.use(express.static("../client/dist"));

const webSocketServer = new WebSocketServer({ noServer: true });

webSocketServer.on("connect", (socket) => {
  console.log("Ws connected");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at: ", server.address());

  server.on("upgrade", (req, socket, buffer) => {
    webSocketServer.handleUpgrade(req, socket, buffer, (socket) => {
      webSocketServer.emit("connect", socket, req);
    });
  });
});
