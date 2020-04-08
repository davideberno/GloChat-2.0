import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";
import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";

import { selectCurrentSocket } from "./redux/socket/socket.selectors";

import "./App.scss";

const App = () => {
  const socket = useSelector(selectCurrentSocket);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      console.log(userAuth);
    });

    return () => {
      unsubscribeFromAuth();
    };
  });

  useEffect(() => {
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  });

  return (
    <BrowserRouter>
      <Route exact path="/" component={JoinRoom} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/chat/:roomId" component={Chat} />
    </BrowserRouter>
  );
};

export default App;
