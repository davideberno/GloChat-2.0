import translationActionTypes from "./translation.types";

const INITIAL_STATE = {
  language: "English",
  on: true,
};

const translationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case translationActionTypes.SET_CURRENT_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case translationActionTypes.TOOGLE_TRANSLATION:
      return {
        ...state,
        on: !action.payload,
      };
    default:
      return state;
  }
};

export default translationReducer;
