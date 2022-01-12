import React, { memo, useEffect, useState } from 'react';
import { lastDayOfMonth, setDate as dateFncSetDate } from 'date-fns';
import { CrossIcon, DatePickerCalendarIcon, RestoreIcon } from '../../Icons';
import DatePick from '../../DatePick';
import Hint from '../lettering/Hint';
import Label from '../lettering/Label';
import { Container } from '../Layout/Container';
import { COLORS } from '../../../constants/variables';
import { getDateWithoutTimezone } from '../../../api';

const initialDateState = {
  value: '',
  error: '',
};

const DatePicker = React.forwardRef(
  (
    {
      disabled,
      className = '',
      label,
      formId,
      minDate,
      maxDate,
      calendarStylePosition,
      floatingCalendar,
      hint,
      hasClearButton,
      checkMinDate,
      date,
      setDate,
      IconComponent = DatePickerCalendarIcon,
      iconClassName,
      day = {},
      month = {},
      year = {},
      onClickIcon = () => {},
    },
    _
  ) => {
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
      if (monthValue && Number(monthValue) !== 0) {
        const monthNumber = monthValue - 1;
        if (monthNumber > 11) {
          if (monthValue[1] === '0') return 0;
          return monthValue[1] - 1;
        }
        return monthNumber;
      }
      return 0;
    };

    const getValidDay = (dayValue) => {
      const formatDay = dayValue && replaceFirstZero(dayValue);
      const lastDayInMonth = date && lastDayOfMonth(date).getDate();

      if (lastDayInMonth < formatDay) {
        if (formatDay[1] === '0') return '01';
        return `0${dayValue[1]}`;
      }
      if (formatDay === '0' || formatDay === '') return '01';
      return formatDay;
    };

    const getValidYear = (dayValue) => (dayValue ? `20${dayValue}` : 0);

    useEffect(() => {
      if (localDay.error !== '' || localMonth.error !== '' || localYear.error !== '') return;
      if (localDay.value === '' || localMonth.value === '' || localYear.value === '') return;

      const gmtDate = getDateWithoutTimezone(
        new Date(getValidYear(localYear.value), getValidMonth(localMonth.value), getValidDay(localDay.value))
      );
      setDate(gmtDate);
    }, [localDay, localMonth, localYear]);

    // NOTE Need to decide which error handling approach to use
    const onChangeDay = (value) => {
      const hasError = parseInt(value, 10) > 31;
      //  setLocalDay({ value, error: hasError ? 'Invalid Date' : '' });
      setLocalDay({ value: hasError ? '31' : value, error: '' });
    };

    const onChangeMonth = (value) => {
      const hasError = parseInt(value, 10) > 12;
      // NOTE Option 1: Allow invalid value, return error
      //  setLocalMonth({ value, error: hasError ? 'Invalid Month' : '' });
      // NOTE Option 2: Does not allow invalid value, default to the max, no error
      setLocalMonth({ value: hasError ? '12' : value, error: '' });
    };

    const onChangeYear = (value) => {
      setLocalYear({ value, error: '' });
    };

    const inputs = [
      { name: 'day', id: `${formId}-day`, visible: true, ...localDay, ...day, onChangeValue: onChangeDay, max: 31 },
      {
        name: 'month',
        id: `${formId}-month`,
        visible: true,
        ...localMonth,
        ...month,
        onChangeValue: onChangeMonth,
        max: 12,
      },
      {
        name: 'year',
        id: `${formId}-year`,
        visible: true,
        ...localYear,
        ...year,
        onChangeValue: onChangeYear,
        max: 99,
      },
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
      setDate(previousDate);
      setPreviousDate(null);
    };

    const changeCalendarInput = (newDate) => {
      setDate(newDate);
      setIsOpenCalendar(false);
    };

    return (
      <div className={`govuk-date-input lbh-date-input${outerClass}${disabledClass}`} id={formId && `${formId}-errors`}>
        {label && <Label className="govuk-date-input__label">{label}</Label>}
        {hint && <Hint className="govuk-date-input__hint">{hint}</Hint>}
        <Container display="flex" alignItems="center">
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
                  value={date === null ? '' : `00${input.value}`.slice(-2)}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (input.onChange) {
                      return input.onChange(e);
                    }
                    if (input.onChangeValue) {
                      let slicedValue = value.slice(-2);
                      if (date === null) {
                        slicedValue = `0${value}`;
                      }
                      input.onChangeValue(slicedValue);
                    }
                  }}
                  min={1}
                  max={input.max}
                  step={1}
                  name={input.name}
                  type="number"
                />
              </div>
            );
          })}
          {IconComponent && (
            <div className="date-picker__calendar-container">
              <div
                className="date-picker__additional-action"
                style={{ background: isOpenCalendar ? COLORS['light-blue'] : '' }}
              >
                <IconComponent onClick={clickIcon} className={iconClassName} />
              </div>
              {isOpenCalendar && (
                <DatePick
                  calendarStylePosition={calendarStylePosition}
                  className={`${floatingCalendar ? 'fixed-datepicker' : ''}`}
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
          {hasClearButton && date && (
            <div className="date-picker__additional-action clear-datepicker" onClick={clearDate}>
              <CrossIcon />
            </div>
          )}
          {previousDate && (
            <div onClick={restoreDate} className="date-picker__additional-action restore-date">
              <RestoreIcon />
            </div>
          )}
        </Container>
      </div>
    );
  }
);

export default memo(DatePicker);
