import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import Alert from "@material-ui/lab/Alert";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";
import { selectTranslationLanguage } from "../../redux/translation/translation.selectors";

import { setCurrentUser } from "../../redux/user/user.actions";
import { setCurrentRoom } from "../../redux/room/room.actions";
import { setCurrentLanguage } from "../../redux/translation/translation.actions";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ChatIcon from "@material-ui/icons/Chat";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Copyright from "../copyright/copyright.component";

import "./join-room.styles.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const JoinRoom = () => {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ChatIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join room
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {warning ? <Alert severity="warning">{warning}</Alert> : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Choose room name"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
          <Typography variant="subtitle1" gutterBottom>
            Or generate one :
          </Typography>
          {!roomName ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => generateRoom(e)}
            >
              Generate
            </Button>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Join
          </Button>
        </form>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default JoinRoom;
