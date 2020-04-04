const rooms = [];

addRoom = roomName => {
  rooms.push({ roomName, messages: [] });
  return rooms;
};

addMessageToRoom = (roomName, message) => {
  const room = rooms.find(room => room.roomName === roomName);
  room.messages.push(message);
  return room.messages;
};
