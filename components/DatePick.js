import React from "react";
import DatePicker from "react-datepicker";
import BaseField from "./baseComponents/BaseField";
import ErrorField from "./ErrorField";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({ error, setError, classes = '', disabled = false, label, setDate, dateValue }) => {
  return (
    <BaseField classes={`${classes} react-date-picker`} label={label} noInputStyle={true}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        disabled={disabled}
        onChange={(value) => {
          setError && setError();
          setDate(value)
        }}
        selected={dateValue}
        className='react-date-picker__input'
      />
      {error && <ErrorField text={error} /> }
    </BaseField>
  );
};

export default DatePick;
