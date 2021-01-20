// The Guess Who Server

const express = require("express");
const app = express();
const server = app.listen(process.env.PORT || 3000);
const io = require("socket.io")(server);

app.use(express.static("src"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/start", (request, response) => {
  response.sendFile(__dirname + "/pages/start.html");
});

app.get("/characters", (request, response) => {
  response.sendFile(__dirname + "/pages/games/characters.html");
});

app.get("/friends", (request, response) => {
  response.sendFile(__dirname + "/pages/games/friends.html");
});

let chatters = {};

io.on("connection", socket => {
  socket.on("name", data => {
    chatters[socket.id] = data;
    socket.broadcast.emit("user-connected", data)
  });
  socket.on("message", message => {
    socket.broadcast.emit("message", { name: chatters[socket.id], message: message });
  });
  socket.on("disconnect", ()=>{
    socket.broadcast.emit("user-disconnected", chatters[socket.id])
    delete chatters[socket.id]
  })
});
