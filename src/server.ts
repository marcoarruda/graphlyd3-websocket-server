import * as express from "express";
import { Express, Request, Response } from "express";

import * as path from "path";

import * as http from "http";
import { Server } from "http";

import * as socketio from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
  allowEIO3: true,
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve("./client/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message) => {
    socket.emit("received", message);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
