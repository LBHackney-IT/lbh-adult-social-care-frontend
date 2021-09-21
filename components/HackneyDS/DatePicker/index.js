import React, { useEffect, useRef, useState } from 'react';
import FormGroup from '../FormGroup';
import { DatePickerCalendarIcon } from '../../Icons';
import DatePick from '../../DatePick';

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
  const calendarContainerRef = useRef(null);
  const [isMouseLeave, setMouseLeave] = useState(false);
  const [isCalendarBlur, setIsCalendarBlur] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
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

  const onBlurCalendar = () => setIsCalendarBlur(true);

  useEffect(() => {
    if (IconComponent && isMouseLeave && isCalendarBlur) {
      setIsOpenCalendar(false);
    }
  }, [IconComponent, isMouseLeave, isCalendarBlur]);

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
        <div
          ref={calendarContainerRef}
          onMouseLeave={() => {
            setMouseLeave(true);
            setIsCalendarBlur(false);
            calendarContainerRef.current.focus();
          }}
          onMouseEnter={() => {
            setMouseLeave(false);
            setIsCalendarBlur(false);
          }}
          className='date-picker__calendar-container'
          tabIndex={-1}
          onBlur={onBlurCalendar}
        >
          <IconComponent onClick={clickIcon} className={iconClassName}/>
          {isOpenCalendar &&
          <DatePick
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
