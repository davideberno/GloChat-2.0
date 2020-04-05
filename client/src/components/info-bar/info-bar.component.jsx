import React, { useState, useEffect } from "react";

import "./info-bar.styles.scss";

import languages from "../../languages";

const InfoBar = ({ userName, language, setLanguage, socket }) => {
  const [translationOn, setTranslationOn] = useState(false);

  useEffect(() => {
    socket.emit("translationOn", translationOn);
  }, [socket, translationOn]);

  return (
    <div className="info-bar">
      <div className="user-name">Welcome {userName}</div>
      <div className="select-language">
        <div className="info-bar-item">
          <label htmlFor="translationOn">Translation</label>
          <input
            type="checkbox"
            name="translationOn"
            id="translationOn"
            checked={translationOn}
            onChange={() => setTranslationOn(!translationOn)}
          />
        </div>
        <div className="info-bar-item">
          <label htmlFor="defaultLanguage">Select your language</label>
          <select
            disabled={translationOn ? false : true}
            id="defaultanguage"
            value={language}
            name="defaultLanguage"
            onChange={(event) => setLanguage(event)}
          >
            {Object.keys(languages).map((lang, i) => (
              <option key={i}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
