const users = [];

const getUser = (userName) => {
  return users.find(
    (user) => user.userName.toLowerCase() === userName.toLowerCase()
  );
};

const getUsersInRoom = (userName) => {
  const user = getUser(userName);
  return users.filter((u) => u.roomName === user.roomName);
};

const addUser = ({ userName, roomName, language, socketId }) => {
  const existingUser = getUser(userName);

  if (existingUser) {
    return { error: "Username already taken!" };
  } else {
    const user = {
      userName,
      roomName,
      language,
      socketId,
      translationOn: false,
    };
    users.push(user);
    return { user };
  }
};

const setUserLanguage = (userName, language) => {
  const user = getUser(userName);
  if (user) {
    user.language = language;
  }
  return user;
};

const toogleTranslation = (userName) => {
  const user = getUser(userName);
  if (user) {
    user.translationOn = !user.translationOn;
  }
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  const user = users.splice(index, 1)[0];
  return { user, users };
};

module.exports = {
  addUser,
  deleteUser,
  getUser,
  setUserLanguage,
  getUsersInRoom,
  toogleTranslation,
};
