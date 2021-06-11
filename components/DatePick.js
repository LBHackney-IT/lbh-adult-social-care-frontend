import React from "react";
import DatePicker from "react-datepicker";
import BaseField from "./baseComponents/BaseField";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({ classes = '', disabled = false, label, setDate, dateValue }) => {
  return (
    <BaseField classes={`${classes} react-date-picker`} label={label} noInputStyle={true}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        disabled={disabled}
        onChange={setDate}
        selected={dateValue}
        className='react-date-picker__input'
      />
    </BaseField>
  );
};

export default DatePick;
