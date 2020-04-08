import translationActionTypes from "./translation.types";

export const setCurrentLanguage = (language) => ({
  type: translationActionTypes.SET_CURRENT_LANGUAGE,
  payload: language,
});

export const toogleTranslation = (translationOn) => ({
  type: translationActionTypes.TOOGLE_TRANSLATION,
  payload: translationOn,
});
