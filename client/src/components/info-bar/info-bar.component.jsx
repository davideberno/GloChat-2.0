import React from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import SelectLanguage from "../select-language/select-language.comcponent";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectTranslationOn } from "../../redux/translation/translation.selectors";

import { toogleTranslation } from "../../redux/translation/translation.actions";

import "./info-bar.styles.scss";

const InfoBar = () => {
  const userName = useSelector(selectCurrentUser);
  const translationOn = useSelector(selectTranslationOn);
  const dispatch = useDispatch();

  const handleChange = () => {
    axios
      .post("translationOn", { userName })
      .then((res) => dispatch(toogleTranslation(res.data.translationOn)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="info-bar">
      <div className="user-name">Welcome {userName}</div>
      <div className="select-translation-language">
        <div className="translation-check">
          <label htmlFor="translationOn">Translation</label>
          <input
            type="checkbox"
            name="translationOn"
            id="translationOn"
            checked={translationOn}
            onChange={handleChange}
          />
        </div>
        <SelectLanguage />
      </div>
    </div>
  );
};

export default InfoBar;
