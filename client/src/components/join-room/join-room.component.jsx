import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import Alert from "@material-ui/lab/Alert";
import SelectLanguage from "../select-language/select-language.comcponent";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";
import { selectTranslationLanguage } from "../../redux/translation/translation.selectors";

import { setCurrentUser } from "../../redux/user/user.actions";
import { setCurrentRoom } from "../../redux/room/room.actions";
import { setCurrentLanguage } from "../../redux/translation/translation.actions";

import "./join-room.styles.scss";

const JoinRoom = () => {
  const socket = useSelector(selectCurrentSocket);
  const language = useSelector(selectTranslationLanguage);
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [warning, setWarning] = useState("");

  const dispatch = useDispatch();

  const { roomId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (roomId) {
      setRoomName(roomId);
    }
  }, [roomId]);

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
    axios
      .post("/user", { userName, roomName, language, socketId: socket.id })
      .then((res) => {
        const { userName, roomName, language, error } = res.data;
        if (error) {
          setWarning(error);
        } else {
          dispatch(setCurrentUser(userName));
          dispatch(setCurrentLanguage(language));
          dispatch(setCurrentRoom(roomName));
          socket.emit("join", { userName, roomName });
          history.push(`/chat/${roomName}`);
        }
      })
      .catch((err) => console.log(err));
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
