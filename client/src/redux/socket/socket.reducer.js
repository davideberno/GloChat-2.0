import socketActionTypes from "./socket.types";

import io from "socket.io-client";

const INITIAL_STATE = {
  currentSocket: io("https://glochat2-1585614391026.appspot.com/"),
};

const socketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case socketActionTypes.SET_SOCKET:
      return {
        ...state,
        currentSocket: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
