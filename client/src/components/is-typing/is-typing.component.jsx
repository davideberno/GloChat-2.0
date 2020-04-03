import React, { useState, useEffect } from "react";

import "./is-typing.styles.scss";

const IsTyping = ({ socket }) => {
  const [isTyping, setIsTyping] = useState("");

  useEffect(() => {
    socket.on("isTyping", userName => {
      setIsTyping(userName);
      setTimeout(() => {
        setIsTyping("");
      }, 2000);
    });
  }, [socket]);

  return isTyping ? (
    <span className="is-typing-allert">{`${isTyping} is typing...`}</span>
  ) : null;
};

export default IsTyping;
