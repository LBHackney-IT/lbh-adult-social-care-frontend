import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  DatePicker,
  FormGroup,
  HorizontalSeparator,
  Input,
  Link,
  VerticalSeparator,
} from 'components';
import { v4 as uuidv4 } from 'uuid';

export const OneOffNeed = ({ cancel, updateDetails }) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [cost, setCost] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(null);
  const [fromDateValidation, setFromDateValidation] = useState('');
  const [costValidation, setCostValidation] = useState('');

  const handleFromDate = (value) => {
    if (fromDateValidation && value) setFromDateValidation('');
    setFromDate(value);
  };

  const handleCost = (value) => {
    if (costValidation && value) setCostValidation('');
    setCost(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    cancel();
  };

  const handleSubmit = () => {
    if (!fromDate) {
      setFromDateValidation('Please choose a start date');
    } else if (!cost || Number.isNaN(cost)) {
      setCostValidation('Please enter a cost');
    } else if (cost < 0) {
      setCostValidation('Please enter a valid cost');
    } else if (fromDate && cost) {
      const newDetail = {
        cost,
        startDate: fromDate.toISOString(),
        costPeriod: 2,
        type: 2,
        endDate: isOngoing || toDate === null ? null : toDate.toISOString(),
        id: uuidv4(),
        isNew: true,
      };
      updateDetails(newDetail);
    }
  };
  return (
    <Container display="flex">
      <Container display="flex" flexDirection="column" flex="1">
        <FormGroup error={costValidation}>
          <Input
            label="Cost"
            type="number"
            step="any"
            preSign="£"
            value={cost}
            onChangeValue={(text) => handleCost(text)}
            flex
          />
        </FormGroup>
        <FormGroup error={fromDateValidation}>
          <DatePicker label="Start" date={fromDate} setDate={(value) => handleFromDate(value)} hasClearButton />
        </FormGroup>
        <FormGroup error={fromDateValidation}>
          <DatePicker disabled={isOngoing} label="End" date={toDate} setDate={setToDate} hasClearButton />
        </FormGroup>
      </Container>
    </Container>
  );
};
