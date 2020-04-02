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
  </div>
);

export default Message;
