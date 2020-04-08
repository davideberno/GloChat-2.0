require("dotenv").config();

const bodyParser = require("body-parser");

const path = require("path");

const express = require("express");

const translateText = require("./goole-translate/translateText");
const { languages } = require("./goole-translate/languages-server");

const {
  addUser,
  deleteUser,
  setUserLanguage,
  getUsersInRoom,
  toogleTranslation,
  setUserSocketId,
} = require("./users");

const app = express();

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json());

const server = require("http").Server(app);

const io = require("socket.io")(server);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.post("/user", (req, res) => {
  const { userName, roomName, language, socketId } = req.body;
  const { error, user } = addUser({
    userName,
    roomName,
    language,
    socketId,
  });
  if (error) {
    return res.json({ error });
  }
  res.json(user);
});

app.post("/language", (req, res) => {
  const { userName, language } = req.body;
  const user = setUserLanguage(userName, language);
  res.json(user);
});

app.post("/chat/translationOn", (req, res) => {
  const { userName } = req.body;
  const user = toogleTranslation(userName);
  res.json(user);
});

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
  });
}

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("join", ({ userName, roomName }) => {
    const users = getUsersInRoom(userName);

    socket.join(roomName);

    io.to(roomName).emit("roomUsers", users);

    socket.to(roomName).emit("message", {
      userName: "Admin",
      text: `${userName} joined`,
    });
  });

  socket.on("message", ({ text, userName, roomName }) => {
    const users = getUsersInRoom(userName);

    users.forEach(async (user) => {
      if (user.socketId === socket.id || !user.translationOn) {
        io.to(`${user.socketId}`).emit("message", {
          userName,
          text,
        });
      } else {
        const translatedText = await translateText(
          text,
          languages[user.language]
        );
        io.to(`${user.socketId}`).emit("message", {
          userName,
          text: translatedText[0],
        });
      }
    });
  });

  socket.on("isTyping", ({ userName, roomName }) => {
    socket.to(roomName).emit("isTyping", userName);
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconnected ${reason}`);
    const { user, users } = deleteUser(socket.id);
    if (user) {
      io.to(user.roomName).emit("roomUsers", users);
    }
  });
});
