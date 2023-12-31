const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
const e = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error); // se tiver um erro esse return irá expulsar dessa função.

    socket.emit("message", {
      //envia mensagem para um em específico. (Para o usuário)
      user: "admin",
      text: `${user.name}, bem vindo a sala ${user.room}`,
    });
    socket.broadcast // broadcast envia mensagens para todos (Para todos os usuários)
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, entrou!` });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    console.log(user);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: user.name,
        text: `${user.name} saiu.`,
      });
    }
  });
});

httpServer.listen(PORT, () => console.log("Is running"));
