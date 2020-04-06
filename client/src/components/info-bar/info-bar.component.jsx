import React, { useState, useEffect } from "react";

import SelectLanguage from "../select-language/select-language.comcponent";

import "./info-bar.styles.scss";

const InfoBar = ({ userName, language, setLanguage, socket }) => {
  const [translationOn, setTranslationOn] = useState(false);

  useEffect(() => {
    socket.emit("translationOn", translationOn);
  }, [socket, translationOn]);

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
            onChange={() => setTranslationOn(!translationOn)}
          />
        </div>
        <SelectLanguage
          socket={socket}
          language={language}
          setLanguage={setLanguage}
          translationOn={translationOn}
        />
      </div>
    </div>
  );
};

export default InfoBar;
