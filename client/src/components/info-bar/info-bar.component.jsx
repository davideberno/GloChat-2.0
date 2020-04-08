import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SelectLanguage from "../select-language/select-language.comcponent";

import { selectCurrentSocket } from "../../redux/socket/socket.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectTranslationOn } from "../../redux/translation/translation.selectors";

import { toogleTranslation } from "../../redux/translation/translation.actions";

import "./info-bar.styles.scss";

const InfoBar = () => {
  const socket = useSelector(selectCurrentSocket);
  const userName = useSelector(selectCurrentUser);
  const translationOn = useSelector(selectTranslationOn);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("translationOn", translationOn);
  }, [translationOn, socket]);

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
            onChange={() => dispatch(toogleTranslation(translationOn))}
          />
        </div>
        <SelectLanguage />
      </div>
    </div>
  );
};

export default InfoBar;
