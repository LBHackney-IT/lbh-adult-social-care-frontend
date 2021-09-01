import React from 'react';
import { FormGroup } from '../index';
import DateInput from '.';

export default {
  title: 'Hackney Design System/DateInput',
  component: DateInput,
  argTypes: {
    text: 'string',
    value: { type: 'object' },
  },
};

const Template = ({ args, wrapperArgs }) => (
  <FormGroup {...wrapperArgs}>
    <DateInput {...args} />
  </FormGroup>
);

export const Default = Template.bind({});

// console.log(`Default`, Default);

Default.args = {
  args: { value: new Date('2015-03-24T21:00:00.000Z') },
  wrapperArgs: { title: 'What is your date of birth?', hint: 'For example, 31 3 1980' },
};

export const ErrorsOnly = Template.bind({});

ErrorsOnly.args = {
  args: { error: { day: true, month: true, year: true } },
  wrapperArgs: {
    title: 'What is your date of birth?',
    error: 'Error message goes here',
  },
};

export const ErrorsWithHint = Template.bind({});

ErrorsWithHint.args = {
  args: { error: { day: true, month: true, year: true } },
  wrapperArgs: {
    title: 'What is your date of birth?',
    hint: 'For example, 31 3 1980',
    error: 'Error message goes here',
  },
};

export const ErrorsOnDayInput = Template.bind({});

ErrorsOnDayInput.args = {
  args: { error: { day: true, month: false, year: false } },
  wrapperArgs: {
    title: 'What is your date of birth?',
    error: 'Error message goes here',
    className: 'extra-class'
  },
};
