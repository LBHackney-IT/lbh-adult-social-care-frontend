import React from 'react';
import { Checkbox, DatePicker, FormGroup } from '../../HackneyDS';

const BrokeragePackageDates = ({
  dates,
  setDates,
  isOngoing,
  setIsOngoing,
  startMinDate,
  startMaxDate,
  endMaxDate,
  error,
  fields = {
    dateTo: 'dateTo',
    dateFrom: 'dateFrom',
  },
  label,
  checkboxId = 'package-dates-id',
  hasOngoing = true,
}) => {
  const dateToError = !isOngoing && dates[fields.dateTo] < dates[fields.dateFrom] ? '(Date to) less then (date from)' : '';
  return (
    <FormGroup error={error || dateToError} className="brokerage__package-dates" label={label}>
      <DatePicker
        day={{ label: 'From' }}
        minDate={startMinDate}
        maxDate={startMaxDate}
        date={dates[fields.dateFrom]}
        setDate={(date) => setDates(fields.dateFrom, date)}
      />
      <DatePicker
        disabled={isOngoing}
        day={{ label: 'To' }}
        minDate={dates[fields.dateFrom]}
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