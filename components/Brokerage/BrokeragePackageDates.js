import FormGroup from '../HackneyDS/FormGroup';
import DatePicker from '../HackneyDS/DatePicker';
import { Checkbox } from '../HackneyDS';
import React from 'react';

const BrokeragePackageDates = ({ dates, setDates, isOngoing, setIsOngoing }) => (
  <FormGroup className="brokerage__package-dates" label="Package dates">
    <DatePicker
      day={dates.dayFrom}
      date={dates.dateFrom}
      setDate={(date) => setDates(prevState => ({
        ...prevState,
        dateFrom: date,
      }))}
    />
    <DatePicker
      day={dates.dayTo}
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
        onChangeValue={value => setIsOngoing(value)}
        checked={isOngoing}
        label="Ongoing"
      />
    }
  </FormGroup>
);

export default BrokeragePackageDates;