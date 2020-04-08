import React from "react";

import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  selectTranslationLanguage,
  selectTranslationOn,
} from "../../redux/translation/translation.selectors";

import { setCurrentLanguage } from "../../redux/translation/translation.actions";

import languages from "../../languages";

import "./select-language.styles.scss";

const SelectLanguage = () => {
  const userName = useSelector(selectCurrentUser);
  const language = useSelector(selectTranslationLanguage);
  const translationOn = useSelector(selectTranslationOn);

  const dispatch = useDispatch();

  const setNewLanguage = (event) => {
    axios
      .post("/language", { userName, language: event.target.value })
      .then((res) => dispatch(setCurrentLanguage(res.data.language)))
      .catch((err) => console.log(err));
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
