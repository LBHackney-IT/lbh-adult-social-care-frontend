import React, { forwardRef } from 'react';
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
  onClickOutside,
  dateFormat = dateStringFormats.dayMonthYear,
  label,
  minDate,
  maxDate,
  setDate,
  dateValue,
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="datepicker-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

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
          onClickOutside={onClickOutside}
          maxDate={maxDate}
          selectsRange={selectsRange}
          customInput={<CustomInput />}
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
