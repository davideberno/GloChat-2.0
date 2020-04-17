import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";
import Homepage from "./components/homepage/homepage.component";
import Navbar from "./components/navbar/navbar.component";

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
    <>
      <Navbar />
      <Switch>
        <Route exact path="/join" component={JoinRoom} />
        <Route exact path="/chat/:roomId" component={Chat} />
        <Route path="/" component={Homepage} />
      </Switch>
    </>
  );
};

export default App;
