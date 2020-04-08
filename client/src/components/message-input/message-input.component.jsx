import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import IsTyping from "../is-typing/is-typing.component";
import Button from "@material-ui/core/Button";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectTranslationLanguage } from "../../redux/translation/translation.selectors";
import { selectRoomName } from "../../redux/room/room.selectors";

import "./message-input.styles.scss";

const MessageInput = () => {
  const socket = useSelector(selectCurrentSocket);
  const userName = useSelector(selectCurrentUser);
  const language = useSelector(selectTranslationLanguage);
  const roomName = useSelector(selectRoomName);

  const [message, setMessage] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmitMessage();
    }
  };

  const handleChange = (event) => {
    socket.emit("isTyping", { userName, roomName });

    setMessage(event.target.value);
  };

  const handleSubmitMessage = () => {
    if (message) {
      socket.emit("message", {
        userName,
        language,
        roomName,
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <form className="message-form">
      <IsTyping />
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
