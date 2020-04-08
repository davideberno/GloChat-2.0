import React from "react";
import { useSelector } from "react-redux";

import Messages from "../messages/messages.component";
import InfoBar from "../info-bar/info-bar.component";
import Users from "../users/users.component";
import MessageInput from "../message-input/message-input.component";
import JoinRoom from "../join-room/join-room.component";

import { selectRoomName } from "../../redux/room/room.selectors";

import "./chat.styles.scss";

const Chat = () => {
  const roomName = useSelector(selectRoomName);
  return (
    <>
      <div className="chat-container">
        <InfoBar />
        <Users />
        <Messages />
        <MessageInput />
      </div>
      {!roomName ? <JoinRoom absolute /> : null}
    </>
  );
};

export default Chat;
