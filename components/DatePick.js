import React, { forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import BaseField from './BaseField';
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
  dateFormat = dateStringFormats.dayMonthYearSlash,
  label,
  minDate,
  maxDate,
  checkMinDate,
  setDate,
  calendarStylePosition = {},
  dateValue,
  useDefaultInput,
}) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      className="datepicker-custom-input"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      ref={ref}
    >
      {value || <p className="datepicker-custom-input-placeholder">{placeholder}</p>}
    </button>
  ));

  useEffect(() => {
    if (checkMinDate && dateValue && minDate) {
      if (dateValue < minDate) {
        setDate(minDate);
      }
    }
  }, [checkMinDate, minDate, dateValue]);

  return (
    <BaseField style={calendarStylePosition} className="react-date-picker" label={label} noInputStyle>
      {dateValue?.toString() === 'Invalid Date' ? (
        <p>Invalid Date</p>
      ) : (
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
          customInput={!useDefaultInput && <CustomInput />}
          selected={dateValue}
          inline={inline}
          placeholderText={placeholder}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          calendarClassName={className}
          className="react-date-picker__input"
        />
      )}
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default DatePick;
