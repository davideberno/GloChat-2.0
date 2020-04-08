import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";

import { selectCurrentSocket } from "./redux/socket/socket.selectors";

import "./App.scss";

const App = () => {
  const socket = useSelector(selectCurrentSocket);

  useEffect(() => {
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  });

  return (
    <BrowserRouter>
      <Route exact path="/" component={JoinRoom} />
      <Route path="/chat/:roomId" component={Chat} />
    </BrowserRouter>
  );
};

export default App;
