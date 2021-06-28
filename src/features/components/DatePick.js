import React from "react";
import DatePicker from "react-date-picker";
import "./assets/datePick.scss";
import BaseField from "./baseComponents/BaseField";
import { CalendarIcon } from "./Icons";
import ErrorField from "./ErrorField";

const DatePick = ({ error, setError, classes = '', disabled = false, label, setDate, dateValue }) => {
  return (
    <BaseField classes={classes} label={label} noInputStyle={true}>
      <DatePicker
        disabled={disabled}
        clearIcon={null}
        calendarIcon={<CalendarIcon />}
        onChange={(value) => {
          setError && setError();
          setDate(value)
        }}
        value={dateValue}
        format="dd/MM/y"
      />
      {error && <ErrorField text={error} /> }
    </BaseField>
  );
};

export default DatePick;
