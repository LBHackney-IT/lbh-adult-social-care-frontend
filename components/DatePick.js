import React from 'react';
import DatePicker from 'react-datepicker';
import BaseField from './baseComponents/BaseField';
import ErrorField from './ErrorField';
import 'react-datepicker/dist/react-datepicker.css';

const DatePick = ({
  selectsRange,
  inline,
  placeholder,
  startDate = new Date(),
  endDate = '',
  error,
  setError = () => {},
  classes = '',
  disabled = false,
  label,
  minDate,
  maxDate,
  setDate,
  dateValue,
}) => {
  return (
    <BaseField classes={`${classes} react-date-picker`} label={label} noInputStyle>
      {dateValue?.toString() === 'Invalid Date' ? <p>Invalid Date</p> :
        <DatePicker
          dateFormat="dd/MM/yyyy"
          disabled={disabled}
          onChange={(value) => {
            setError();
            setDate(value);
          }}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          selectsRange={selectsRange}
          selected={dateValue}
          inline={inline}
          placeholderText={placeholder}
          className="react-date-picker__input"
        />
      }
      {error && <ErrorField text={error} />}
    </BaseField>
  );
}

export default DatePick;
