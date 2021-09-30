import React, { useEffect, useState } from 'react';
import { DatePickerCalendarIcon } from '../../Icons';
import DatePick from '../../DatePick';
import { Hint, Label } from '../index';

export default function DatePicker ({
  className = '',
  label,
  formId,
  hint,
  date,
  setDate,
  IconComponent = DatePickerCalendarIcon,
  iconClassName,
  day = {},
  month = {},
  year = {},
  onClickIcon = () => {},
}) {
  const actualDate = new Date();

  const [localDay, setLocalDay] = useState({
    value: '',
    onChangeValue: (value) => setDate(new Date(
      date?.getFullYear() || actualDate.getFullYear(),
      date?.getMonth() || actualDate.getMonth(),
      value
    )),
    error: '',
  });


  const [localMonth, setLocalMonth] = useState({
    value: '',
    onChangeValue: (value) => setDate(new Date(
      date?.getFullYear() || actualDate.getFullYear(),
      value - 1 === -1 ? value : value - 1,
      date?.getDate() || actualDate.getDate(),
    )),
    error: '',
  });

  const [localYear, setLocalYear] = useState({
    value: '',
    onChangeValue: (value) => setDate(new Date(
      value,
      date?.getMonth() || actualDate.getMonth(),
      date?.getDate() || actualDate.getDate(),
    )),
    error: '',
  });

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const inputs = [
    { name: 'day', id: `${formId}-day`, visible: true, ...day, ...localDay },
    { name: 'month', id: `${formId}-month`, visible: true, ...month, localMonth },
    { name: 'year', id: `${formId}-year`, visible: true, ...year, localYear },
  ];

  const clickIcon = () => {
    setIsOpenCalendar(true);
    onClickIcon();
  };

  const changeCalendarInput = (newDate) => setDate(newDate);

  useEffect(() => {
    if (date) {
      setLocalDay(prevState => ({ ...prevState, value: date.getDate(), error: '' }));
      setLocalMonth(prevState => ({ ...prevState, value: date.getMonth() + 1, error: '' }));
      setLocalYear(prevState => ({ ...prevState, value: date.getFullYear(), error: '' }));
    }
  }, [date]);

  return (
    <div className={`${className} govuk-date-input lbh-date-input`} id={`${formId}-errors`}>
      {label && <Label className="govuk-date-input__label">{label}</Label>}
      {hint && <Hint className="govuk-date-input__hint">{hint}</Hint>}
      {inputs.map((input) => {
        if (!input.visible) return null;

        const errorClass = input.error ? 'govuk-input--error ' : '';

        return (
          <div key={input.id} className="govuk-date-input__item">
            {input.label && <label className="govuk-label govuk-date-input__label" htmlFor={input.id}>
              {input.label}
            </label>}
            <input
              className={`${errorClass}govuk-input govuk-date-input__input ${input.className}`}
              id={input.id}
              value={`00${input.value}`.slice(-2)}
              onChange={e => {
                if (input.onChange) {
                  input.onChange(e);
                }
                if (input.onChangeValue) {
                  const slicedValue = e.target.value.slice(1, 3);
                  input.onChangeValue(slicedValue);
                }
              }}
              min={1}
              step={1}
              name={input.name}
              type="number"
            />
          </div>
        );
      })}
      {IconComponent &&
      <div className="date-picker__calendar-container">
        <IconComponent onClick={clickIcon} className={iconClassName}/>
        {isOpenCalendar &&
        <DatePick
          onClickOutside={() => {
            if (isOpenCalendar) {
              setIsOpenCalendar(false);
            }
          }}
          startDate={date}
          inline
          dateValue={date}
          setDate={changeCalendarInput}
        />}
      </div>
      }
    </div>
  );
}
