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

export const NewWeeklyNeed = ({ cancel, updateDetails }) => {
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
    <Container display="flex" flexDirection="column" flex="1">
      <Container display="flex" flexDirection="column">
        <FormGroup label="New additional need">
          <FormGroup error={fromDateValidation}>
            <Container display="flex">
              <DatePicker
                day={{ label: 'From' }}
                date={fromDate}
                setDate={(value) => handleFromDate(value)}
                hasClearButton
              />
              <VerticalSeparator width="20px" />
              <DatePicker disabled={isOngoing} day={{ label: 'To' }} date={toDate} setDate={setToDate} hasClearButton />
              <VerticalSeparator width="20px" />
              <Checkbox label="Ongoing" value={isOngoing} onChangeValue={() => setIsOngoing(!isOngoing)} />
            </Container>
          </FormGroup>
          <HorizontalSeparator height="20px" />
          <Container display="flex" justifyContent="stretch" alignItems="flex-start">
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
          </Container>
        </FormGroup>
        <HorizontalSeparator height="10px" />

        <Container display="flex" justifyContent="space-between" alignItems="flex-start">
          <Link onClick={(e) => handleClick(e)} noVisited>
            Cancel
          </Link>
          <Button onClick={handleSubmit}>Add need</Button>
        </Container>
      </Container>
    </Container>
  );
};
