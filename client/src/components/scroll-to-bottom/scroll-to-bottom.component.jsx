import React, { useEffect } from "react";

import "./scroll-to-bottom.styles.scss";

let messagesEnd;

const ScrollToBottom = ({ messages }) => {
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="dummy-div-scroll"
      ref={el => {
        messagesEnd = el;
      }}
    />
  );
};

export default ScrollToBottom;
