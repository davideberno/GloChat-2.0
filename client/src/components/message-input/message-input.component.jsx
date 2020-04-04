import React, { useState } from "react";

import IsTyping from "../is-typing/is-typing.component";

import Button from "@material-ui/core/Button";

import "./message-input.styles.scss";

const MessageInput = ({ socket, userName, roomName, language }) => {
  const [message, setMessage] = useState("");

  const handleChange = event => {
    socket.emit("isTyping", { userName, roomName });

    setMessage(event.target.value);
  };

  const handleSubmitMessage = () => {
    if (message) {
      socket.emit("message", {
        userName,
        language,
        roomName,
        text: message
      });
      setMessage("");
    }
  };

  return (
    <form className="message-form">
      <IsTyping socket={socket} />
      <input
        id="message"
        name="message"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
      />
      <Button onClick={handleSubmitMessage}>Send</Button>
    </form>
  );
};

export default MessageInput;
