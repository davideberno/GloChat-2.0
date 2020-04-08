import roomActionTypes from "./room.types";

const INITIAL_STATE = {
  roomName: null,
};

const roomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case roomActionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        roomName: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
