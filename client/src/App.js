import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";

import { selectCurrentSocket } from "./redux/socket/socket.selectors";

import { setCurrentUser } from "./redux/user/user.actions";
import { setCurrentRoom } from "./redux/room/room.actions";
import { setCurrentLanguage } from "./redux/translation/translation.actions";

import "./App.scss";

const App = () => {
  const socket = useSelector(selectCurrentSocket);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("joinedRoom", ({ userName, roomName, language }) => {
      dispatch(setCurrentUser(userName));
      dispatch(setCurrentLanguage(language));
      dispatch(setCurrentRoom(roomName));
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [socket, dispatch]);

  return (
    <BrowserRouter>
      <Route exact path="/" component={JoinRoom} />
      <Route path="/chat/:roomId" component={Chat} />
    </BrowserRouter>
  );
};

export default App;
