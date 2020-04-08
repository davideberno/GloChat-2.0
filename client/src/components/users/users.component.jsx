import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";

import "./users.styles.scss";

const Users = () => {
  const socket = useSelector(selectCurrentSocket);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("roomUsers", (users) => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <div className="users">
      <h4>Users in room:</h4>
      <ul className="users-list">
        {users.map((user, i) => (
          <li key={i} className="user-item">
            {user.userName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
