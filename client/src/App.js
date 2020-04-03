import React, { useState, useEffect } from "react";

import io from "socket.io-client";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";

import languages from "./languages";

import "./App.scss";

const newSocket = io("http://localhost:5000");

const App = () => {
  const [socket] = useState(newSocket);
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState("");
  const [warning, setWarning] = useState("");

  const setNewLanguage = event => {
    setLanguage(event.target.value);
    socket.emit("setLanguage", event.target.value);
  };

  useEffect(() => {
    socket.on("joinedRoom", ({ userName, roomName, defaultLanguage }) => {
      setUserName(userName);
      setRoomName(roomName);
      setLanguage(defaultLanguage);
    });
    socket.on("warning", warning => {
      setWarning(warning);

      setTimeout(() => {
        setWarning("");
      }, 2000);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [socket]);

  return !roomName ? (
    <JoinRoom socket={socket} warning={warning} languages={languages} />
  ) : (
    <Chat
      socket={socket}
      userName={userName}
      roomName={roomName}
      language={language}
      setLanguage={setNewLanguage}
    />
  );
};

export default App;
