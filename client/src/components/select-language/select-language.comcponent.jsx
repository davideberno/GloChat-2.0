import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";
import {
  selectTranslationLanguage,
  selectTranslationOn,
} from "../../redux/translation/translation.selectors";

import { setCurrentLanguage } from "../../redux/translation/translation.actions";

import languages from "../../languages";

import "./select-language.styles.scss";

const SelectLanguage = () => {
  const socket = useSelector(selectCurrentSocket);
  const language = useSelector(selectTranslationLanguage);
  const translationOn = useSelector(selectTranslationOn);

  const dispatch = useDispatch();

  const setNewLanguage = (event) => {
    dispatch(setCurrentLanguage(event.target.value));
    socket.emit("setLanguage", event.target.value);
  };
  return (
    <div className="select-language">
      <label htmlFor="default-language">Select your language</label>
      <select
        disabled={translationOn ? false : true}
        id="default-language"
        name="defaultLanguage"
        value={language}
        onChange={(event) => setNewLanguage(event)}
      >
        {Object.keys(languages).map((lang, i) => (
          <option key={i}>{lang}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;
