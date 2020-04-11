import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { auth } from "./firebase/firebase.utils";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";
// import SignIn from "./components/signin/signin.component";
// import SignUp from "./components/signup/signup.component";
// import Homepage from "./components/homepage/homepage.component";
import Navbar from "./components/navbar/navbar.component";

// import Copyright from "./components/copyright/copyright.component";

// import Box from "@material-ui/core/Box";

import { selectCurrentSocket } from "./redux/socket/socket.selectors";

import "./App.scss";

const App = () => {
  const socket = useSelector(selectCurrentSocket);

  // useEffect(() => {
  //   const unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
  //     console.log(userAuth);
  //   });

  //   return () => {
  //     unsubscribeFromAuth();
  //   };
  // });

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
        {/* <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} /> */}
        <Route exact path="/chat/:roomId" component={Chat} />
        <Route path="/" component={JoinRoom} />
      </Switch>
      {/* <Box mt={4}>
        <Copyright />
      </Box> */}
    </>
  );
};

export default App;
