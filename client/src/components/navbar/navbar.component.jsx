import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// import { auth } from "../../firebase/firebase.utils";

// import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectRoomName } from "../../redux/room/room.selectors";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MenuItem from "@material-ui/core/MenuItem";
// import Menu from "@material-ui/core/Menu";

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

  // const userName = useSelector(selectCurrentUser);
  const roomName = useSelector(selectRoomName);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = (event) => {
  //   setAnchorEl(null);
  // };

  // const handleSettings = () => {
  //   handleClose();
  //   history.push("/settings");
  // };

  // const handelLogOut = () => {
  //   handleClose();
  //   auth.signOut();
  //   history.push("/");
  // };

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
          {/* {userName ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem value="Settings">Settings</MenuItem>
                <MenuItem onClick={handelLogOut} value="Log Out">
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          ) : null} */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
