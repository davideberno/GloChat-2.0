import React, { useState, useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import io from "socket.io-client";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";

import "./App.scss";

const local = "http://localhost:8080/";

//const url = "https://glochat2-1585614391026.appspot.com/";

const newSocket = io(local);

const App = () => {
  const socket = newSocket;
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    socket.on("joinedRoom", ({ userName, roomName, language }) => {
      setUserName(userName);
      setRoomName(roomName);
      setLanguage(language);
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
            setLanguage={setLanguage}
          />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
