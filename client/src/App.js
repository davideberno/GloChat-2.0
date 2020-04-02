import React, { Component } from "react";

import io from "socket.io-client";

import JoinRoom from "./components/join-room/join-room.component";
import ChatRoom from "./components/chat-room/chat-room.component";
import InfoBar from "./components/info-bar/info-bar.component";
import Users from "./components/users/users.component";

import languages from "./languages";

import "./App.scss";

class App extends Component {
  state = {
    userName: null,
    roomName: null,
    socket: null,
    messages: [],
    users: [],
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
    //Listen for users in room
    socket.on("roomUsers", users => {
      this.setState({
        users: users
      });
    });
    //Listen for message event
    socket.on("message", message => {
      this.setState({
        messages: [...this.state.messages, message]
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
    const {
      messages,
      roomName,
      socket,
      userName,
      users,
      warning,
      language
    } = this.state;
    return !roomName ? (
      <JoinRoom socket={socket} warning={warning} languages={languages} />
    ) : (
      <div className="chat-container">
        <InfoBar
          userName={userName}
          language={language}
          languages={languages}
          setLanguage={this.setLanguage}
        />
        <Users users={users} />
        <ChatRoom
          messages={messages}
          roomName={roomName}
          userName={userName}
          socket={socket}
          language={language}
        />
      </div>
    );
  }
}

export default App;
