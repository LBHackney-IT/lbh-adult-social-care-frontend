import React from "react";
import DatePicker from "react-datepicker";
import BaseField from "./baseComponents/BaseField";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({ classes = '', disabled = false, label, setDate, dateValue }) => {
  return (
    <BaseField classes={`${classes} react-date-picker`} label={label} noInputStyle={true}>
      <DatePicker
        disabled={disabled}
        onChange={setDate}
        selected={dateValue}
        format="dd/MM/YYYY"
      />
    </BaseField>
  );
};

export default DatePick;
