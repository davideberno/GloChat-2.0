import React from "react";

import "./message.styles.scss";

const Message = ({ msg, userName }) => (
  <div
    className={`message-container ${
      userName === msg.userName ? "container-outgoing" : "container-incoming"
    }`}
  >
    {userName !== msg.userName ? (
      <div className="sender-username">{msg.userName}</div>
    ) : null}
    <div
      className={`message ${
        userName === msg.userName ? "outgoing" : "incoming"
      }`}
    >
      {msg.text}
    </div>
    {msg.translatedText ? (
      <>
        <div className="sender-username">Translation:</div>
        <div
          className={`message translatedText ${
            userName === msg.userName ? "outgoing" : "incoming"
          }`}
        >
          {msg.translatedText}
        </div>
      </>
    ) : null}
  </div>
);

export default Message;
