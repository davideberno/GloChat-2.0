import React from "react";

import Messages from "../messages/messages.component";
import InfoBar from "../info-bar/info-bar.component";
import Users from "../users/users.component";
import MessageInput from "../message-input/message-input.component";
import JoinRoom from "../join-room/join-room.component";

import "./chat.styles.scss";

const Chat = ({ socket, userName, roomName, language, setLanguage }) => {
  return (
    <>
      <div className="chat-container">
        <InfoBar
          userName={userName}
          language={language}
          socket={socket}
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
      {!roomName ? <JoinRoom socket={socket} absolute /> : null}
    </>
  );
};

export default Chat;
