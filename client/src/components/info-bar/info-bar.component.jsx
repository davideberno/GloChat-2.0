import React from "react";

import "./info-bar.styles.scss";

const InfoBar = ({ userName, language, languages, setLanguage }) => (
  <div className="info-bar">
    <div className="user-name">Welcome {userName}</div>
    <div className="select-language">
      <label>Select your language</label>
      <select
        value={language}
        name="defaultLanguage"
        onChange={event => setLanguage(event)}
      >
        {Object.keys(languages).map((lang, i) => (
          <option key={i}>{lang}</option>
        ))}
      </select>
    </div>
  </div>
);

export default InfoBar;
