import FormGroup from '../HackneyDS/FormGroup';
import DatePicker from '../HackneyDS/DatePicker';
import { Checkbox } from '../HackneyDS';
import React from 'react';

const BrokeragePackageDates = ({ dates, setDates, isOngoing, setIsOngoing, label }) => (
  <FormGroup className="brokerage__package-dates" label={label}>
    <DatePicker
      day={{ label: 'From' }}
      date={dates.dateFrom}
      setDate={(date) => setDates(prevState => ({
        ...prevState,
        dateFrom: date,
      }))}
    />
    <DatePicker
      disabled={isOngoing}
      day={{ label: 'To' }}
      date={dates.dateTo}
      setDate={(date) => setDates(prevState => ({
        ...prevState,
        dateTo: date,
      }))}
    />
    {setIsOngoing &&
    <Checkbox
      value={isOngoing}
      id="package-dates-id"
      onChangeValue={(value) => {
        setIsOngoing(value);
        setDates(prevState => ({
          ...prevState,
          dateTo: null,
        }));
      }}
      label="Ongoing"
    />
    }
  </FormGroup>
);

export default BrokeragePackageDates;