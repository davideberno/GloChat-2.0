import React from "react";
import { useSelector } from "react-redux";

import MessageInput from "../message-input/message-input.component";
import Messages from "../messages/messages.component";
import Users from "../users/users.component";
import SelectLanguage from "../select-language/select-language.component";
import TranslationSwitch from "../translation-switch/translation-switch.component";
import JoinRoom from "../join-room/join-room.component";

import { selectRoomName } from "../../redux/room/room.selectors";

import "./chat.styles.scss";

const Chat = () => {
  const roomName = useSelector(selectRoomName);
  return !roomName ? (
    <JoinRoom />
  ) : (
    <div className="chat">
      <div className="chats">
        <Users />
      </div>
      <div className="translation">
        <TranslationSwitch />
        <SelectLanguage />
      </div>
      <div className="messages">
        <Messages />
      </div>
      <div className="message-input">
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
