import React, { useState, useEffect } from "react";

import Message from "../message/message.component";

import "./messages.styles.scss";
import ScrollToBottom from "../scroll-to-bottom/scroll-to-bottom.component";

const Messages = ({ socket, userName }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(prevMessages => [...prevMessages, message]);
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
