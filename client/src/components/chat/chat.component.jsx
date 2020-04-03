import React from "react";

import Messages from "../messages/messages.component";
import InfoBar from "../info-bar/info-bar.component";
import Users from "../users/users.component";
import MessageInput from "../message-input/message-input.component";

import "./chat.styles.scss";

const Chat = ({ socket, userName, roomName, language, setLanguage }) => (
  <div className="chat-container">
    <InfoBar
      userName={userName}
      language={language}
      setLanguage={setLanguage}
    />
    <Users socket={socket} />
    <Messages socket={socket} userName={userName} />
    <MessageInput
      socket={socket}
      userName={userName}
      roomName={roomName}
      language={language}
    />
  </div>
);

export default Chat;
