import * as express from "express";
import { Express, Request, Response } from "express";
import * as path from "path";

const app = express();

import * as http from "http";
const server = http.createServer(app);

import * as socketio from "socket.io";
const io = new socketio.Server(server, {
  allowEIO3: true,
  cors: { allowedHeaders: ["*"] },
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
