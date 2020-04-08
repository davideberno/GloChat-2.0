import userActionTypes from "./user.types";

export const setCurrentUser = (userName) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: userName,
});
