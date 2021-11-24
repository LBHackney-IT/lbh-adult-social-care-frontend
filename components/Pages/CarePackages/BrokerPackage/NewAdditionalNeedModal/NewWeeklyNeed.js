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
const x = 1;
  return (
    <Container display="flex">
      <Container display="flex" flexDirection="column" flex='1'>
        <FormGroup>
          <Input
            label="Cost"
            type="number"
            step="any"
            preSign="£"
            flex
          />
        </FormGroup>
        <FormGroup>
          <DatePicker label="Start" date={new Date()} setDate={() => {}} hasClearButton />
        </FormGroup>
      </Container>
      
    </Container>
  );
};
