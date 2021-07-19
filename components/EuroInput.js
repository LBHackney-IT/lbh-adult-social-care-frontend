import React from "react";
import Input from "./Input";
import { currency } from "../constants/strings";

const EuroInput = props => {
  return (
    <Input preSign={currency.euro} {...props} />
  )
};

export default EuroInput;
