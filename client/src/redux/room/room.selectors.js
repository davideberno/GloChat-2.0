import { createSelector } from "reselect";

const selectRoom = (state) => state.room;

export const selectRoomName = createSelector(
  [selectRoom],
  (room) => room.roomName
);
