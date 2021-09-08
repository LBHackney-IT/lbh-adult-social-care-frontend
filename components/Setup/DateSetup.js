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
  disabledStartDate,
  startDate,
  setStartDate,
  startMaxDate,
  endDate,
  setEndDate,
}) => {
  const disabledEndDate = !isFixedPeriod || disabledStartDate;

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
            if(value) {
              setEndDate(startDate)
            }
            changeErrorFields('endDate');
          }}
          selectedValue={isFixedPeriod}
        />
      </div>
      <div className="is-flex">
        <span className="mr-3">
          <DatePick
            label="Start Date"
            error={errorFields.startDate}
            minDate={new Date()}
            setError={() => changeErrorFields('startDate')}
            dateValue={startDate}
            setDate={setStartDate}
          />
        </span>
        <span>
          <DatePick
            label="End Date"
            dateValue={!isFixedPeriod ? '' : endDate}
            disabled={disabledEndDate}
            minDate={startDate}
            maxDate={startMaxDate}
            classes={`${!isFixedPeriod ? ' datepicker-ongoing' : ''}${disabledStartDate ? ' disabled' : ''}`}
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
