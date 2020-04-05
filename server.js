require("dotenv").config();

const path = require("path");

const express = require("express");

const app = express();

const http = require("http").createServer(app);

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "/client/build")));

const io = require("socket.io")(http);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const translateText = require("./goole-translate/translateText");
const { languages } = require("./goole-translate/languages-server");

const {
  addUser,
  deleteUser,
  setUserLanguage,
  getUsersInRoom,
  toogleTranslation,
} = require("./users");

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("join", ({ userName, roomName, defaultLanguage }) => {
    const { error, users } = addUser({
      userName,
      roomName,
      language: defaultLanguage,
      id: socket.id,
    });

    if (error) {
      return socket.emit("warning", error);
    }

    socket.join(roomName);

    socket.emit("joinedRoom", { userName, roomName, defaultLanguage });

    io.to(roomName).emit("roomUsers", users);

    socket.to(roomName).emit("message", {
      userName: "Admin",
      text: `${userName} joined`,
    });
  });

  socket.on("translationOn", (translationOn) => {
    toogleTranslation(socket.id, translationOn);
  });

  socket.on("message", ({ text, userName, roomName }) => {
    const users = getUsersInRoom(socket.id);

    users.forEach(async (user) => {
      if (user.id === socket.id || !user.translationOn) {
        io.to(`${user.id}`).emit("message", {
          userName,
          text,
        });
      } else {
        const translatedText = await translateText(
          text,
          languages[user.language]
        );
        io.to(`${user.id}`).emit("message", {
          userName,
          text: translatedText[0],
        });
      }
    });
  });

  socket.on("setLanguage", (language) => {
    setUserLanguage(socket.id, language);
  });

  socket.on("isTyping", ({ userName, roomName }) => {
    socket.to(roomName).emit("isTyping", userName);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
    const { user, users } = deleteUser(socket.id);
    if (user) {
      io.to(user.roomName).emit("roomUsers", users);
    }
  });
});

http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
