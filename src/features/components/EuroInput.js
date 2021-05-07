import React from "react";
import Input from "./Input";
import {euroSign} from "../../constants/strings";

const EuroInput = props => {
  return (
    <Input preSign={euroSign} {...props} />
  )
};

export default EuroInput;
