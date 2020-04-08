import userActionTypes from "./user.types";

const INITIAL_STATE = {
  userName: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
