import React, { useState } from 'react';
import DatePickerCalendar from './DatePickerCalendar';
import { Container } from '../Layout/Container';

export default {
  title: 'Hackney Design System/Form/DatePickerCalendar.js',
  component: DatePickerCalendar,
  argTypes: {
    disabled: { type: 'boolean' },
  },
};

const Template = (args) => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState('Error message');

  const { useError } = args;

  return (
    <Container maxWidth={300}>
      <DatePickerCalendar {...args} dateValue={date} setDate={setDate} error={useError && error} setError={useError && setError} />
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const InlineCalendar = Template.bind({});
InlineCalendar.args = {
  inline: true,
};

export const WithError = Template.bind({});
WithError.args = {
  useError: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};