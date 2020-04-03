import React, { Component } from "react";

import io from "socket.io-client";

import JoinRoom from "./components/join-room/join-room.component";
import Chat from "./components/chat/chat.component";

import languages from "./languages";

import "./App.scss";

class App extends Component {
  state = {
    userName: null,
    roomName: null,
    socket: null,
    language: "",
    warning: ""
  };

  setLanguage = event => {
    const { socket } = this.state;
    this.setState({
      language: event.target.value
    });
    socket.emit("setLanguage", event.target.value);
  };

  componentDidMount() {
    //Connect to new socket
    const socket = io("http://localhost:5000");
    //Set socket for the session
    this.setState({
      socket: socket
    });
    //Listen for join room event
    socket.on("joinedRoom", ({ userName, roomName, defaultLanguage }) => {
      this.setState({
        userName: userName,
        roomName: roomName,
        language: defaultLanguage
      });
    });
    //Listen for warnings
    socket.on("warning", warning => {
      this.setState(
        {
          warning: warning
        },
        () => {
          setTimeout(() => {
            this.setState({
              warning: ""
            });
          }, 2000);
        }
      );
    });
  }

  componentWillUnmount() {
    const { socket } = this.state;
    //Disconnect from socket
    socket.emit("disconnect");
    socket.off();
  }

  render() {
    const { userName, language, roomName, socket, warning } = this.state;
    return !roomName ? (
      <JoinRoom socket={socket} warning={warning} languages={languages} />
    ) : (
      <Chat
        socket={socket}
        userName={userName}
        roomName={roomName}
        language={language}
        setLanguage={this.setLanguage}
      />
    );
  }
}

export default App;
