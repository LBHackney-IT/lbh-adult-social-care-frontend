import React, { useState } from 'react';
import { DatePickerCalendarIcon } from '../../Icons';
import DatePick from '../../DatePick';
import { Label } from '../index';

export default function DatePicker ({
  className = '',
  label,
  formId,
  day,
  month,
  IconComponent = DatePickerCalendarIcon,
  iconClassName,
  onClickIcon = () => {},
  year,
  hint,
}) {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const inputs = [
    { name: 'day', id: `${formId}-day`, visible: true, ...day },
    { name: 'month', id: `${formId}-month`, visible: true, ...month },
    { name: 'year', id: `${formId}-year`, visible: true, ...year },
  ];

  const clickIcon = () => {
    setIsOpenCalendar(true);
    onClickIcon();
  };

  const changeCalendarInput = (date) => {
    const values = [date.getDate(), date.getMonth() + 1, date.getFullYear().toString().slice(2, 4)];
    inputs.forEach((item, index) => {
      if (item.onChangeValue) {
        item.onChangeValue(values[index]);
      }
    });
  };

  const currentDate = new Date();
  const calendarValue = new Date(
    (year.value && `20${year.value}`) || currentDate.getFullYear(),
    month.value || currentDate.getMonth() + 1,
    day.value || currentDate.getDate(),
  );

  return (
    <div className={`${className} govuk-date-input lbh-date-input`} id={`${formId}-errors`}>
      {label && <Label>{label}</Label>}
      {hint && <Label>{hint}</Label>}
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
                console.log(e.target.value);
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
      <div className='date-picker__calendar-container'>
        <IconComponent onClick={clickIcon} className={iconClassName}/>
        {isOpenCalendar &&
        <DatePick
          onClickOutside={() => {
            if (isOpenCalendar) {
              setIsOpenCalendar(false);
            }
          }}
          startDate={calendarValue}
          inline
          dateValue={calendarValue}
          setDate={changeCalendarInput}
        />}
      </div>
      }
    </div>
  );
}
