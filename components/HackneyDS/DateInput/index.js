import React, { useState, useReducer, useEffect, useMemo } from 'react';

export default function DateInput({
  id,
  name,
  value,
  error = { day: undefined, month: undefined, year: undefined },
  handler = () => {},
}) {
  const isDateValid = (d) => d?.getDate() && d?.getMonth() && d?.getYear();

  const initialDate = useMemo(() => {
    if ((!value && typeof value === 'object') || value instanceof Date) return value;
    console.error('Value for "DateInput" should be an instance of Date');
  }, [value]);

  const [date, setDate] = useReducer((state, values) => {
    if (values === 'reset') return undefined;
    return new Date(values.year, values.month, values.day);
  }, initialDate);

  const [inputValues, setInputValues] = useState({
    day: date instanceof Date ? date.getDate() : undefined,
    month: date instanceof Date ? date.getMonth() : undefined,
    year: date instanceof Date ? date.getFullYear() : undefined,
  });

  useEffect(() => {
    if (inputValues.day && (inputValues.month || inputValues.month === 0) && inputValues.year) setDate(inputValues);
    else setDate('reset');
  }, [inputValues]);

  useEffect(() => {
    if (isDateValid(date)) handler(date);
  }, [date]);

  const errorClassList = ' govuk-input--error';

  return (
    <div className="govuk-date-input lbh-date-input" id={id} name={name}>
      <div className="govuk-date-input__item">
        <div className="govuk-form-group">
          <label className="govuk-label govuk-date-input__label" htmlFor="dob-day">
            Day
          </label>
          <input
            className={`govuk-input govuk-date-input__input govuk-input--width-2${error.day ? errorClassList : ''}`}
            name="dob-day"
            type="text"
            value={inputValues.day || ''}
            maxLength="2"
            onChange={(e) => setInputValues({ ...inputValues, day: Number.parseInt(e.target.value, 10) })}
          />
        </div>
      </div>
      <div className="govuk-date-input__item">
        <div className="govuk-form-group">
          <label className="govuk-label govuk-date-input__label" htmlFor="dob-month">
            Month
          </label>
          <input
            className={`govuk-input govuk-date-input__input govuk-input--width-2${error.month ? errorClassList : ''}`}
            name="dob-month"
            type="text"
            value={inputValues.month + 1 || ''}
            maxLength="2"
            onChange={(e) => setInputValues({ ...inputValues, month: Number.parseInt(e.target.value, 10) - 1 })}
          />
        </div>
      </div>
      <div className="govuk-date-input__item">
        <div className="govuk-form-group">
          <label className="govuk-label govuk-date-input__label" htmlFor="dob-year">
            Year
          </label>
          <input
            className={`govuk-input govuk-date-input__input govuk-input--width-4${error.year ? errorClassList : ''}`}
            name="dob-year"
            type="text"
            value={inputValues.year || ''}
            maxLength="4"
            onChange={(e) => {
              setInputValues({ ...inputValues, year: Number.parseInt(e.target.value, 10) });
            }}
          />
        </div>
      </div>
    </div>
  );
}
