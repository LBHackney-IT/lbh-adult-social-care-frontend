import React from 'react';
import { compareDescendingDMY } from 'service';
import { dateDescending } from 'constants/variables';
import { Checkbox, FormGroup, DatePicker } from '../../HackneyDS';

const BrokeragePackageDates = ({
  dates,
  setDates,
  isOngoing,
  setIsOngoing,
  startMinDate,
  startMaxDate,
  showError = true,
  hasEndMinDate = true,
  endMaxDate,
  hasClearButton,
  error,
  fields = {
    dateTo: 'dateTo',
    dateFrom: 'dateFrom',
  },
  label,
  checkboxId = 'package-dates-id',
  hasOngoing = true,
}) => {
  const dateToError = showError && !isOngoing && compareDescendingDMY(dates[fields.dateTo], dates[fields.dateFrom]) === dateDescending.asc ? '(Date to) less then (date from)' : '';
  return (
    <FormGroup error={error || dateToError} className="brokerage__package-dates" label={label}>
      <DatePicker
        hasClearButton={hasClearButton}
        day={{ label: 'From' }}
        minDate={startMinDate}
        maxDate={startMaxDate}
        date={dates[fields.dateFrom]}
        setDate={(date) => setDates(fields.dateFrom, date)}
      />
      <DatePicker
        hasClearButton={hasClearButton}
        disabled={isOngoing}
        day={{ label: 'To' }}
        minDate={hasEndMinDate && dates[fields.dateFrom]}
        maxDate={endMaxDate}
        date={dates[fields.dateTo]}
        setDate={(date) => setDates(fields.dateTo, date)}
      />
      {hasOngoing &&
      <Checkbox
        value={isOngoing}
        id={checkboxId}
        onChangeValue={value => setIsOngoing(value)}
        label="Ongoing"
      />
      }
    </FormGroup>
  );
}

export default BrokeragePackageDates;