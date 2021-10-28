import React, { useEffect, memo, useState } from 'react';
import { lastDayOfMonth } from 'date-fns';
import { DatePickerCalendarIcon, RestoreIcon, CrossIcon } from '../../Icons';
import DatePick from '../../DatePick';
import Hint from '../lettering/Hint';
import Label from '../lettering/Label';

const initialDateState = {
  value: '',
  error: '',
};

const DatePicker = ({
  disabled,
  className = '',
  label,
  formId,
  minDate,
  maxDate,
  hint,
  hasClear,
  date,
  setDate,
  IconComponent = DatePickerCalendarIcon,
  iconClassName,
  day = {},
  month = {},
  year = {},
  onClickIcon = () => {},
}) => {
  const [localDay, setLocalDay] = useState({
    value: '',
    error: '',
  });

  const [previousDate, setPreviousDate] = useState(null);

  const [localMonth, setLocalMonth] = useState({
    value: '',
    error: '',
  });

  const [localYear, setLocalYear] = useState({
    value: '',
    error: '',
  });

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const outerClass = className ? ` ${className}` : '';
  const disabledClass = disabled ? ' disabled' : '';
  const actualDate = new Date();

  // get value 01 return 1, get value 10 return 10
  const replaceFirstZero = (string) => string && (string[0] === '0' ? string.replace('0', '') : string);

  const getValidMonth = (monthValue) => {
    // if value more then 11 return 0 (date.getMonth() start from 0) 11 December and max number of month
    // get value 02 format to 2 and 2-1=1 February
    const validMonth = replaceFirstZero(monthValue) - 1 > 11 ? 0 : replaceFirstZero(monthValue) - 1;
    return Number(validMonth) < 0 ? 0 : Number(validMonth);
  };

  const getValidDay = (dayValue) => {
    const formatDay = dayValue && replaceFirstZero(dayValue);
    const lastDayInMonth = date && lastDayOfMonth(date).getDate();
    const validDay = formatDay && lastDayInMonth && lastDayInMonth < formatDay ? 1 : formatDay;
    return Number(validDay) || 1;
  };

  const getValidYear = (dayValue) => (dayValue ? `20${dayValue}` : 0);

  const onChangeDay = (value) => {
    setDate(new Date(date?.getFullYear() || 0, date?.getMonth() || 0, getValidDay(value)));
  };

  const onChangeMonth = (value) => {
    setDate(
      new Date(
        date?.getFullYear() || actualDate.getFullYear(),
        getValidMonth(value),
        date?.getDate() || actualDate.getDate()
      )
    );
  };

  const onChangeYear = (value) => {
    setDate(new Date(getValidYear(value), date?.getMonth() || 0, date?.getDate() || 1));
  };

  const inputs = [
    { name: 'day', id: `${formId}-day`, visible: true, ...localDay, ...day, onChangeValue: onChangeDay },
    { name: 'month', id: `${formId}-month`, visible: true, ...localMonth, ...month, onChangeValue: onChangeMonth },
    { name: 'year', id: `${formId}-year`, visible: true, ...localYear, ...year, onChangeValue: onChangeYear },
  ];

  const clickIcon = () => {
    setIsOpenCalendar(true);
    onClickIcon();
  };

  const clearDate = () => {
    setDate(null);
    setPreviousDate(date);
  };

  const restoreDate = () => {
    setDate(previousDate)
    setPreviousDate(null);
  }

  const changeCalendarInput = (newDate) => setDate(newDate);

  useEffect(() => {
    if (date) {
      setPreviousDate(null);
      const formatDate = new Date(date);
      setLocalDay((prevState) => ({ ...prevState, value: formatDate.getDate(), error: '' }));
      setLocalMonth((prevState) => ({ ...prevState, value: formatDate.getMonth() + 1, error: '' }));
      setLocalYear((prevState) => ({
        ...prevState,
        value: formatDate.getFullYear().toString().slice(2, 4),
        error: '',
      }));
    } else {
      setLocalDay({ ...initialDateState });
      setLocalMonth({ ...initialDateState });
      setLocalYear({ ...initialDateState });
    }
  }, [date]);

  return (
    <div className={`govuk-date-input lbh-date-input${outerClass}`} id={formId && `${formId}-errors`}>
      {label && <Label className="govuk-date-input__label">{label}</Label>}
      {hint && <Hint className="govuk-date-input__hint">{hint}</Hint>}
      {inputs.map((input) => {
        if (!input.visible) return null;
        const errorClass = input.error ? 'govuk-input--error ' : '';

        return (
          <div key={input.id} className="govuk-date-input__item">
            {input.label && (
              <label className="govuk-label govuk-date-input__label" htmlFor={input.id}>
                {input.label}
              </label>
            )}
            <input
              className={`${errorClass} govuk-input govuk-date-input__input ${input.className}`}
              id={input.id}
              disabled={disabled}
              value={`00${input.value}`.slice(-2)}
              onChange={(e) => {
                if (input.onChange) {
                  return input.onChange(e);
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
      {IconComponent && (
        <div className={`date-picker__calendar-container${disabledClass}`}>
          <div className='date-picker__additional-action'>
            <IconComponent onClick={clickIcon} className={iconClassName} />
          </div>
          {isOpenCalendar && (
            <DatePick
              onClickOutside={() => {
                if (isOpenCalendar) {
                  setIsOpenCalendar(false);
                }
              }}
              startDate={date}
              inline
              minDate={minDate}
              maxDate={maxDate}
              dateValue={date}
              setDate={changeCalendarInput}
            />
          )}
        </div>
      )}
      {hasClear && date && <div className='date-picker__additional-action clear-datepicker' onClick={clearDate}><CrossIcon /></div>}
      {previousDate && (
        <div onClick={restoreDate} className='date-picker__additional-action restore-date'>
          <RestoreIcon />
        </div>
      )}
    </div>
  );
}

export default memo(DatePicker)
