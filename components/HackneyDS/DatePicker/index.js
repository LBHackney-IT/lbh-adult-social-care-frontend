import React, { useEffect, useState } from 'react';
import FormGroup from '../FormGroup';
import { DatePickerCalendarIcon } from '../../Icons';
import DatePick from '../../DatePick';
import { uniqueID } from '../../../service/helpers';

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
  const [calendarId] = useState(uniqueID());
  const inputs = [
    { name: 'day', id: `${formId}-day`, visible: true, ...day },
    { name: 'month', id: `${formId}-month`, visible: true, ...month },
    { name: 'year', id: `${formId}-year`, visible: true, ...year },
  ];

  const error = day.error || month.error || year.error;

  const clickIcon = () => {
    setIsOpenCalendar(true);
    onClickIcon();
  };

  const changeCalendarInput = (date) => {
    const values = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    inputs.forEach((item, index) => {
      if (item.onChangeValue) {
        item.onChangeValue(values[index]);
      }
    });
  };

  const currentDate = new Date();
  const calendarValue = new Date(
    year.value || currentDate.getFullYear(),
    month.value || currentDate.getMonth() + 1,
    day.value || currentDate.getDate(),
  );

  return (
    <FormGroup className={className} label={label} error={error} hint={hint}>
      <div className="govuk-date-input lbh-date-input" id={`${formId}-errors`}>
        {inputs.map((input) => {
          if (!input.visible) return null;

          const errorClass = input.error ? 'govuk-input--error ' : '';

          return (
            <div key={input.id} className="govuk-date-input__item">
              <label className="govuk-label govuk-date-input__label" htmlFor={input.id}>
                {input.label}
              </label>
              <input
                className={`${errorClass}govuk-input govuk-date-input__input ${input.className}`}
                id={input.id}
                value={input.value}
                onChange={e => {
                  if (input.onChange) {
                    input.onChange(e);
                  }
                  if (input.onChangeValue) {
                    let slicedValue;
                    if (input.name === 'year') {
                      slicedValue = e.target.value.slice(0, 4);
                    } else {
                      slicedValue = e.target.value.slice(0, 2);
                    }
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
        <div id={calendarId} className='date-picker__calendar-container'>
          <IconComponent onClick={clickIcon} className={iconClassName}/>
          {isOpenCalendar &&
          <DatePick
            onClickOutside={() => {
              if(isOpenCalendar) {
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
    </FormGroup>
  );
}
