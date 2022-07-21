"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3000);
var http = require("http").Server(app);
// simple '/' endpoint sending a Hello World
// response
app.get("/", (req, res) => {
    res.send("hello world");
});
// start our simple server up on localhost:3000
const server = http.listen(3000, function () {
    console.log("listening on *:3000");
});
//# sourceMappingURL=server.js.map