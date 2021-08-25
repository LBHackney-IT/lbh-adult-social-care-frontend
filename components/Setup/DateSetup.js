import React, { useEffect } from 'react';
import RadioButton from '../RadioButton';
import DatePick from '../DatePick';
import { getFixedPeriodOptions } from '../../api/Utils/CommonOptions';

const DateSetup = ({
  errorFields = {},
  fixedPeriodOptions = getFixedPeriodOptions(),
  changeErrorFields,
  setIsFixedPeriod,
  isFixedPeriod,
  disabledStartDate,
  startDate,
  setStartDate,
  startMaxDate,
  endDate,
  setEndDate,
}) => {
  useEffect(() => {
    if (isFixedPeriod === true) {
      setEndDate(new Date());
    } else {
      setEndDate('');
    }
  }, [isFixedPeriod]);

  return (
    <div className="column">
      <div>
        <RadioButton
          className="mb-3"
          options={fixedPeriodOptions}
          error={errorFields.isFixedPeriod}
          setError={() => changeErrorFields('isFixedPeriod')}
          onChange={(value) => {
            setIsFixedPeriod(value);
            changeErrorFields('endDate');
          }}
          selectedValue={isFixedPeriod}
        />
      </div>
      <div className="is-flex">
        <span className="mr-3">
          <DatePick
            label="Start Date"
            disabled={disabledStartDate}
            error={errorFields.startDate}
            minDate={new Date()}
            maxDate={startMaxDate}
            classes={disabledStartDate ? 'disabled' : ''}
            setError={() => changeErrorFields('startDate')}
            dateValue={startDate}
            setDate={setStartDate}
          />
        </span>
        <span>
          <DatePick
            label="End Date"
            dateValue={!isFixedPeriod ? '' : endDate}
            disabled={!isFixedPeriod}
            minDate={startDate}
            classes={!isFixedPeriod ? 'datepicker-ongoing' : ''}
            setDate={setEndDate}
            error={errorFields.endDate}
            setError={() => changeErrorFields('endDate')}
          />
        </span>
      </div>
    </div>
  );
};

export default DateSetup;
