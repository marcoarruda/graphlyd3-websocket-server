import * as express from "express";
import { Express, Request, Response } from "express";
import * as path from "path";

import { state as dataState } from "./data";

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

const colors = ["orange", "red", "brown", "green", "purple", "blue", "yellow"];

const state = dataState;
const users: IUser[] = [];

import { Graph, IUser, Node } from "./interfaces";
const deselectNodesByUser = (state: Graph, user: IUser) => {
  const { nodes } = state;
  nodes
    .filter((node) => node.payload.selected === user)
    .forEach((node) => {
      node.payload.selected = undefined;
    });
};
const selectNodeById = (
  state: Graph,
  node_id: string,
  user: IUser
): boolean => {
  const { nodes } = state;
  deselectNodesByUser(state, user);
  const node = nodes.find((node) => node.id === node_id);
  if (node) {
    node.payload.selected = user;
    return true;
  }
  return false;
};

io.on("connection", async (socket) => {
  console.log("a user connected");
  const user = {
    id: socket.id,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
  console.log(user);
  users.push(user);
  io.emit("users", users);

  socket.on("getdata", (message) => {
    socket.emit(
      "getdata",
      users.find((user) => user.id === socket.id)
    );
  });

  socket.on("message", (message) => {
    socket.emit("received", message);
  });
  socket.on("state", () => {
    socket.emit("state", state);
  });
  socket.on("select-node", (data: { user_id: string; node_id: string }) => {
    const { node_id, user_id } = data;
    const user = users.find((user) => user.id === user_id);
    selectNodeById(state, node_id, user);
    io.emit("update", state);
  });
  socket.on("deselect", (user_id) => {
    const user = users.find((user) => user.id === user_id);
    deselectNodesByUser(state, user);
    io.emit("update", state);
  });
  socket.on("push-node", (data) => {
    console.log("on push-node");
    const { node_id, position } = data;
    console.log(position);
    let stateNode = state.nodes.find((node) => node.id === node_id);
    stateNode.x = position.x;
    stateNode.y = position.y;
    io.emit("update", state);
  });
  socket.on("disconnect", () => {
    console.log(users);
    const user = users.find((user) => user.id === socket.id);
    deselectNodesByUser(state, user);
    users.pop();
    io.emit("users", users);
    console.log(users);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
