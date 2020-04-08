import { createSelector } from "reselect";

const selectTranslation = (state) => state.translation;

export const selectTranslationLanguage = createSelector(
  [selectTranslation],
  (translation) => translation.language
);

export const selectTranslationOn = createSelector(
  [selectTranslation],
  (translation) => translation.on
);
