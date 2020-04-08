import socketActionTypes from "./socket.types";

export const setSocket = (socket) => ({
  type: socketActionTypes.SET_SOCKET,
  payload: socket,
});
