const users = [];
//Get user socket id and returns user Object
const getUser = id => {
  return users.find(user => user.id === id);
};
//Get user socket id and returns all users in current room.
const getUsersInRoom = id => {
  const user = getUser(id);
  return users.filter(u => u.roomName === user.roomName);
};
//Get an user Object and returns updated users list
const addUser = ({ userName, roomName, id, language }) => {
  const existingUser = users.find(
    u => u.userName.toLowerCase() === userName.toLowerCase()
  );

  if (!userName || !roomName) {
    return { error: "Username or room missing!" };
  } else if (existingUser) {
    return { error: "Username already taken!" };
  } else {
    users.push({ userName, roomName, id, language });
    const filteredUsers = getUsersInRoom(id);
    return { users: filteredUsers };
  }
};
//Get user socket id and choosen language, and returns the user Object
const setUserLanguage = (id, lang) => {
  const user = getUser(id);
  user.language = lang;
  return user;
};
//Get user socket id and returns the user Object and the updated users list
const deleteUser = id => {
  const index = users.findIndex(u => u.id === id);
  const user = users.splice(index, 1)[0];
  return { user, users };
};

module.exports = {
  addUser,
  deleteUser,
  getUser,
  setUserLanguage,
  getUsersInRoom
};
