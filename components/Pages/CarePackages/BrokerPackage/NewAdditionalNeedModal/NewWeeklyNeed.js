import React from 'react';
import { Container, DatePicker, FormGroup, Input } from 'components';

export const NewWeeklyNeed = () => {
  const x = 1;
  return (
    <Container display="flex">
      <Container display="flex" flexDirection="column" flex="1">
        <FormGroup>
          <Input label="Cost" type="number" step="any" preSign="£" flex />
        </FormGroup>
        <FormGroup>
          <DatePicker label="Start" date={new Date()} setDate={() => {}} hasClearButton />
        </FormGroup>
      </Container>
    </Container>
  );
};
