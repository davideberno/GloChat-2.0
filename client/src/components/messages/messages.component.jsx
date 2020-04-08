import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Message from "../message/message.component";
import ScrollToBottom from "../scroll-to-bottom/scroll-to-bottom.component";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./messages.styles.scss";

const Messages = () => {
  const socket = useSelector(selectCurrentSocket);
  const userName = useSelector(selectCurrentUser);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  return (
    <div className="messages-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} userName={userName} />
        ))}
        <ScrollToBottom messages={messages} />
      </div>
    </div>
  );
};

export default Messages;
