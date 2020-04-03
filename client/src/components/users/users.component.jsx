import React, { useState, useEffect } from "react";

import "./users.styles.scss";

const Users = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("roomUsers", users => {
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
