import React, { useState } from "react";

import IsTyping from "../is-typing/is-typing.component";

import "./message-input.styles.scss";

const MessageInput = ({ socket, userName, roomName, language }) => {
  const [message, setMessage] = useState("");

  const handleChange = event => {
    socket.emit("isTyping", { userName, roomName });

    setMessage(event.target.value);
  };

  const handleSubmitMessage = event => {
    event.preventDefault();
    socket.emit("message", {
      userName: userName,
      text: message,
      language: language,
      roomName: roomName
    });
    setMessage("");
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
      <button type="submit" onClick={handleSubmitMessage}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
