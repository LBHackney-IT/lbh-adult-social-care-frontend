import React, { forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import BaseField from './BaseField';
import ErrorField from './ErrorField';
import 'react-datepicker/dist/react-datepicker.css';
import { dateStringFormats } from '../constants/strings';
import { CrossIcon } from './Icons';
import { Container } from './HackneyDS/Layout/Container';

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

  const clearDate = () => setDate(null);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Container display="flex" alignItems="center">
      <button
        className="datepicker-custom-input"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        ref={ref}
      >
        {value || <p className="datepicker-custom-input-placeholder">{placeholder}</p>}
      </button>
      {!useDefaultInput && dateValue && (
        <div className="date-picker__additional-action clear-datepicker" onClick={clearDate}>
          <CrossIcon />
        </div>
      )}
    </Container>
  ));

  useEffect(() => {
    if (checkMinDate && dateValue && minDate) {
      if (dateValue < minDate) {
        setDate(minDate);
      }
    }
  }, [checkMinDate, minDate, dateValue]);

  return (
    <BaseField
      noInputStyle
      className={`${className} react-date-picker${!useDefaultInput ? ' react-date-picker__custom-input' : ''}`}
      label={label}
      style={calendarStylePosition}
    >
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
