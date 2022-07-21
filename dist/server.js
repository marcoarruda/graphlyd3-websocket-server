"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
    allowEIO3: true,
});
app.get("/", (req, res) => {
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
//# sourceMappingURL=server.js.map