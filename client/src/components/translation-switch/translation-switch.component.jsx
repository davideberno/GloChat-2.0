import React from "react";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { selectTranslationOn } from "../../redux/translation/translation.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { toogleTranslation } from "../../redux/translation/translation.actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const TranslationSwitch = () => {
  const dispatch = useDispatch();

  const userName = useSelector(selectCurrentUser);
  const translationOn = useSelector(selectTranslationOn);

  const handleChange = () => {
    axios
      .post("translationOn", { userName })
      .then((res) => dispatch(toogleTranslation(res.data.translationOn)))
      .catch((err) => console.log(err));
  };
  return (
    <FormControlLabel
      control={
        <Switch
          checked={translationOn}
          onChange={handleChange}
          color="primary"
        />
      }
      label="Translation"
      labelPlacement="start"
    />
  );
};

export default TranslationSwitch;
