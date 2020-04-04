import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";

import "./join-room.styles.scss";

import languages from "../../languages";

const JoinRoom = ({ socket }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("English");
  const [warning, setWarning] = useState("");

  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      setRoomName(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.on("warning", warning => {
      setWarning(warning);

      setTimeout(() => {
        setWarning("");
      }, 2000);
    });
  });

  const handleSubmit = () => {
    socket.emit("join", { userName, roomName, defaultLanguage });
  };

  const generateRoom = event => {
    event.preventDefault();
    const randomRoom = Math.floor(Math.random() * Math.pow(10, 6)).toString();
    setRoomName(randomRoom);
  };

  return (
    <>
      <div className="join-room-background" />
      <div className="join-room">
        <h2>Join a chat room</h2>
        {warning ? <Alert severity="warning">{warning}</Alert> : null}
        <form>
          <label htmlFor="userName">User name:</label>
          <input
            id="userName"
            name="userName"
            value={userName}
            onChange={event => setUserName(event.target.value)}
          />
          <label htmlFor="roomName">Room name:</label>
          <input
            disabled={roomId ? true : false}
            id="roomName"
            name="roomName"
            value={roomName}
            onChange={event => setRoomName(event.target.value)}
          />

          <div className="generate-room">
            <button onClick={e => generateRoom(e)}>Generate a room</button>
          </div>
          <label htmlFor="default-language">Select your language:</label>
          <select
            id="default-language"
            value={defaultLanguage}
            name="defaultLanguage"
            onChange={event => setDefaultLanguage(event.target.value)}
          >
            {Object.keys(languages).map((lang, i) => (
              <option key={i}>{lang}</option>
            ))}
          </select>
          <Link to={`/chat/${roomName}`}>
            <button className="join-button" onClick={handleSubmit}>
              Join
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default JoinRoom;
