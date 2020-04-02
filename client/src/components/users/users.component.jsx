import React from "react";

import "./users.styles.scss";

const Users = ({ users }) => (
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

export default Users;
