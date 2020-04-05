import React, { useState, useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import io from "socket.io-client";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";

import "./App.scss";

const local = "http://localhost:8080/";

const newSocket = io(local, { transports: ["websocket"] });

const App = () => {
  const socket = newSocket;
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState("");

  const setNewLanguage = (event) => {
    setLanguage(event.target.value);
    socket.emit("setLanguage", event.target.value);
  };

  useEffect(() => {
    socket.on("joinedRoom", ({ userName, roomName, defaultLanguage }) => {
      setUserName(userName);
      setRoomName(roomName);
      setLanguage(defaultLanguage);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket]);

  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <JoinRoom socket={socket} />} />
      <Route
        path="/chat/:roomId"
        render={() => (
          <Chat
            socket={socket}
            userName={userName}
            roomName={roomName}
            language={language}
            setLanguage={setNewLanguage}
          />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
