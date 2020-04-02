import React, { useState, useEffect } from "react";

import Message from "../message/message.component";

import "./chat-room.styles.scss";

let messagesEnd;

const ChatRoom = ({ messages, roomName, userName, socket, language }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState("");

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

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("isTyping", userName => {
      setIsTyping(userName);
      setTimeout(() => {
        setIsTyping("");
      }, 2000);
    });
  }, [socket]);

  const handleChange = event => {
    socket.emit("isTyping", { userName, roomName });

    setMessage(event.target.value);
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} userName={userName} />
        ))}
        <div
          className="dummy-div-scroll"
          ref={el => {
            messagesEnd = el;
          }}
        />
      </div>
      <form className="message-form">
        {isTyping ? (
          <span className="is-typing-allert">{`${isTyping} is typing...`}</span>
        ) : null}
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
    </div>
  );
};

export default ChatRoom;
