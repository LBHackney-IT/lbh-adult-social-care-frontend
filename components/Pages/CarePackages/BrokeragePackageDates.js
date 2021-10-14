import FormGroup from '../../HackneyDS/FormGroup';
import DatePicker from '../../HackneyDS/DatePicker';
import { Checkbox } from '../../HackneyDS';
import React from 'react';

const BrokeragePackageDates = ({
  dates,
  setDates,
  isOngoing,
  setIsOngoing,
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
        date={dates[fields.dateFrom]}
        setDate={(date) => setDates(fields.dateFrom, date)}
      />
      <DatePicker
        disabled={isOngoing}
        day={{ label: 'To' }}
        minDate={dates[fields.dateFrom]}
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