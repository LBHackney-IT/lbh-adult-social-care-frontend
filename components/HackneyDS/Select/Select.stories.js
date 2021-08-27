import React from 'react';
import { Select } from '../index';

export default {
  title: 'Hackney Design System/Select',
  component: Select,
  argTypes: {
    value: {
      type: {
        value: 'string',
        text: 'string',
      }
    },
    className: { type: 'string' },
    disabledOptions: { type: 'array' },
    options: { type: 'array' },
    error: { type: 'boolean' },
    onChange: { control: false },
  },
};

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});

Default.args = {
  options: [{ text: 'Option 1', value: 1}, { text: 'Option 2', value: 2}],
  onChange: () => {},
  disabledOptions: [],
  value: { value: 2, text: 'Option 2'},
  className: '',
};

export const DisabledOptions = Template.bind({});

DisabledOptions.args = {
  options: [{ text: 'Option 1', value: 1}, { text: 'Option 2', value: 2}],
  onChange: () => {},
  disabledOptions: [2],
  value: { value: '', text: ''},
  className: '',
};