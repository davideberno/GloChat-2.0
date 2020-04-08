import roomActionTypes from "./room.types";

export const setCurrentRoom = (roomName) => ({
  type: roomActionTypes.SET_CURRENT_ROOM,
  payload: roomName,
});
