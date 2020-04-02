import React, { useState } from "react";

import Alert from "@material-ui/lab/Alert";

import "./join-room.styles.scss";

const JoinRoom = ({ socket, warning, languages }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    socket.emit("join", { userName, roomName, defaultLanguage });
  };

  return (
    <div className="join-room">
      <h2>Join a chat room</h2>
      {warning ? <Alert severity="warning">{warning}</Alert> : null}
      <form>
        <label htmlFor="userName">User name:</label>
        <input
          className="user-name"
          id="userName"
          name="userName"
          value={userName}
          label=""
          onChange={event => setUserName(event.target.value)}
        />
        <label htmlFor="roomName">Room name:</label>
        <input
          className="room-name"
          id="roomName"
          name="roomName"
          value={roomName}
          onChange={event => setRoomName(event.target.value)}
        />
        <label>Select your language</label>
        <select
          value={defaultLanguage}
          name="defaultLanguage"
          onChange={event => setDefaultLanguage(event.target.value)}
        >
          {Object.keys(languages).map((lang, i) => (
            <option key={i}>{lang}</option>
          ))}
        </select>
        <button type="submit" onClick={handleSubmit}>
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;
