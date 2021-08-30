import React from 'react';
import DateInput from '.';

export default {
  title: 'Hackney Design System/DateInput',
  component: DateInput,
  argTypes: {
    text: 'string',
    value: { type: 'object' },
  },
};

const Template = (args) => <DateInput {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: new Date('2015-03-24T21:00:00.000Z'),
};

export const Error = Template.bind({});

Error.args = {
  value: new Date('2015-03-24T21:00:00.000Z'),
  error: 'Error goes here',
};
