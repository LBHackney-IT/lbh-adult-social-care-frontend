import React from 'react';
import DatePicker from 'react-datepicker';
import BaseField from './baseComponents/BaseField';
import ErrorField from './ErrorField';
import 'react-datepicker/dist/react-datepicker.css';
import { dateStringFormats } from '../constants/strings';

const DatePick = ({
  selectsRange,
  inline,
  placeholder,
  startDate = new Date(),
  endDate = '',
  error,
  setError = () => {},
  className = '',
  disabled = false,
  dateFormat = dateStringFormats.dayMonthYear,
  label,
  minDate,
  maxDate,
  setDate,
  dateValue,
}) => {
  return (
    <BaseField className={`${className} react-date-picker`} label={label} noInputStyle>
      {dateValue?.toString() === 'Invalid Date' ? <p>Invalid Date</p> :
        <DatePicker
          dateFormat={dateFormat}
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
};

export default DatePick;
