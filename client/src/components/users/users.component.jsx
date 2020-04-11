import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

import "./users.styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Users = () => {
  const classes = useStyles();
  const socket = useSelector(selectCurrentSocket);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("roomUsers", (users) => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <div className="users">
      <List dense className={classes.root}>
        {users.map((user, i) => {
          return (
            <ListItem key={i} button>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.userName}
                className="username-label"
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Users;
