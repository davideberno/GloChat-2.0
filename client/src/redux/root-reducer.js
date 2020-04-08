import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import socketReducer from "./socket/socket.reducer";
import translationReducer from "./translation/translation.reducer";
import roomReducer from "./room/room.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  translation: translationReducer,
  room: roomReducer,
});

export default rootReducer;
