import React from 'react';
import DatePicker from 'react-datepicker';
import BaseField from './baseComponents/BaseField';
import ErrorField from './ErrorField';
import 'react-datepicker/dist/react-datepicker.css';

const DatePick = ({
  selectsRange,
  inline,
  startDate,
  endDate,
  error,
  setError = () => {},
  classes = '',
  disabled = false,
  label,
  setDate,
  dateValue,
}) => (
  <BaseField classes={`${classes} react-date-picker`} label={label} noInputStyle>
    <DatePicker
      dateFormat="dd/MM/yyyy"
      disabled={disabled}
      onChange={(value) => {
        setError();
        setDate(value);
      }}
      startDate={startDate}
      endDate={endDate}
      selectsRange={selectsRange}
      selected={dateValue}
      inline={inline}
      className="react-date-picker__input"
    />
    {error && <ErrorField text={error} />}
  </BaseField>
);

export default DatePick;
