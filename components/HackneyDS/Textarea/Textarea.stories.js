import React from 'react';
import Textarea from '.';

export default {
  title: 'Hackney Design System/Form/Textarea',
  component: Textarea,
  argTypes: {
    'max-count': { type: 'number' },
    rows: { type: 'number' },
    id: { type: 'string' },
    name: { type: 'string' },
    value: { type: 'string' },
    handler: { control: false },
  },
};

const Template = (args) => <Textarea {...args} />;

export const Default = Template.bind({});

Default.args = {
  rows: 5,
  value: 'Initial value',
  handler: () => {},
};

export const WithCounter = Template.bind({});

WithCounter.args = {
  maxCount: 30,
  rows: 5,
  value: 'Initial value',
  handler: () => {},
};
