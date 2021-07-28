import React from 'react';
import RadioButton from '../RadioButton';
import DatePick from '../DatePick';
import { getFixedPeriodOptions } from '../../api/Utils/CommonOptions';

const DateSetup = ({
  errorFields = {},
  fixedPeriodOptions = getFixedPeriodOptions(),
  changeErrorFields,
  setIsFixedPeriod,
  isFixedPeriod,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="column">
      <div>
        <RadioButton
          className="mb-3"
          options={fixedPeriodOptions}
          error={errorFields.isFixedPeriod}
          setError={() => changeErrorFields('isFixedPeriod')}
          onChange={setIsFixedPeriod}
          selectedValue={isFixedPeriod}
        />
      </div>
      <div className="is-flex">
        <span className="mr-3">
          <DatePick
            label="Start Date"
            error={errorFields.startDate}
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
