import io from "socket.io-client";

import socketActionTypes from "./socket.types";

const INITIAL_STATE = {
  currentSocket: io("http://localhost:8080/"),
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
