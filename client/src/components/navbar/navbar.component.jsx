import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectRoomName } from "../../redux/room/room.selectors";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const path = history.location.pathname;

  const roomName = useSelector(selectRoomName);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() =>
              roomName ? history.push(`${path}`) : history.push("/")
            }
          >
            <ChatIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            GloChat
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
