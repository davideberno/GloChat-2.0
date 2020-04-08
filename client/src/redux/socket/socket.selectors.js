import { createSelector } from "reselect";

const selectSocket = (state) => state.socket;

export const selectCurrentSocket = createSelector(
  [selectSocket],
  (socket) => socket.currentSocket
);
