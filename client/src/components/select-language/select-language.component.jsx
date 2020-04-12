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

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(4),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectLanguage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userName = useSelector(selectCurrentUser);
  const language = useSelector(selectTranslationLanguage);
  const translationOn = useSelector(selectTranslationOn);

  const setNewLanguage = (event) => {
    console.log(event.target.value);
    axios
      .post("/language", { userName, language: event.target.value })
      .then((res) => dispatch(setCurrentLanguage(res.data.language)))
      .catch((err) => console.log(err));
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="language-select">Language</InputLabel>
      <Select
        disabled={translationOn ? false : true}
        labelId="language-select"
        value={language}
        onChange={setNewLanguage}
      >
        {Object.keys(languages).map((lang, i) => (
          <MenuItem key={i} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
