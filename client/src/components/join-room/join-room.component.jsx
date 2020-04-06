import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";
import SelectLanguage from "../select-language/select-language.comcponent";

import "./join-room.styles.scss";

const JoinRoom = ({ socket }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [language, setLanguage] = useState("English");
  const [warning, setWarning] = useState("");

  const { roomId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (roomId) {
      setRoomName(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.on("warning", (warning) => {
      setWarning(warning);
    });
  });

  const handleWarning = (event) => {
    event.preventDefault();
    if (userName) {
      setWarning("Room name missing!");
    } else if (roomName) {
      setWarning("Username missing!");
    } else {
      setWarning("Username and room name missing!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("join", { userName, roomName, language });
    history.push(`/chat/${roomName}`);
  };

  const generateRoom = (event) => {
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
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="roomName">Room name:</label>
          <input
            disabled={roomId ? true : false}
            id="roomName"
            name="roomName"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
          {!roomName ? (
            <div className="generate-room">
              <button onClick={(e) => generateRoom(e)}>Generate a room</button>
            </div>
          ) : null}
          <SelectLanguage
            socket={socket}
            language={language}
            setLanguage={setLanguage}
            translationOn
          />
          <button
            className="join-button"
            onClick={userName && roomName ? handleSubmit : handleWarning}
          >
            Join
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinRoom;
