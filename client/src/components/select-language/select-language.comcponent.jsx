import React from "react";

import languages from "../../languages";

import "./select-language.styles.scss";

const SelectLanguage = ({ socket }) => {
  const setNewLanguage = event => {
    setLanguage(event.target.value);
    socket.emit("setLanguage", event.target.value);
  };
  return (
    <div className="selsect-language">
      <label htmlFor="default-language">Select your language</label>
      <select
        disabled={translationOn ? false : true}
        id="default-language"
        name="defaultLanguage"
        value={language}
        onChange={event => setNewLanguage(event)}
      >
        {Object.keys(languages).map((lang, i) => (
          <option key={i}>{lang}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;
