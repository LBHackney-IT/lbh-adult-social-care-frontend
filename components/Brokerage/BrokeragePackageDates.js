import FormGroup from '../HackneyDS/FormGroup';
import DatePicker from '../HackneyDS/DatePicker';
import { Checkbox } from '../HackneyDS';
import React from 'react';

const BrokeragePackageDates = ({
  dates,
  setDates,
  isOngoing,
  setIsOngoing,
  error,
  label,
  checkboxId = 'package-dates-id',
  hasOngoing = true,
}) => {
  const dateToError = !isOngoing && dates.dateTo < dates.dateFrom ? '(Date to) less then (date from)' : '';
  return (
    <FormGroup error={error || dateToError} className="brokerage__package-dates" label={label}>
      <DatePicker
        day={{ label: 'From' }}
        date={dates.dateFrom}
        setDate={(date) => setDates('dateFrom', date)}
      />
      <DatePicker
        disabled={isOngoing}
        day={{ label: 'To' }}
        minDate={dates.dateFrom}
        date={dates.dateTo}
        setDate={(date) => setDates('dateTo', date)}
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