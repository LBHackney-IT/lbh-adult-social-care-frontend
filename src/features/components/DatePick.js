import React from "react";
import DatePicker from "react-date-picker";
import "./assets/datePick.scss";
import BaseField from "./baseComponents/BaseField";
import { CalendarIcon } from "./Icons";

const DatePick = ({ classes = '', disabled = false, label, setDate, dateValue }) => {
  return (
    <BaseField classes={classes} label={label} noInputStyle={true}>
      <DatePicker
        disabled={disabled}
        clearIcon={null}
        calendarIcon={<CalendarIcon />}
        onChange={setDate}
        value={dateValue}
        format="dd/MM/y"
      />
    </BaseField>
  );
};

export default DatePick;
