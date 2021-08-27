import React from 'react';
import Checkbox from '.';

export default {
  title: 'Hackney Design System/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { type: 'boolean' },
    small: { type: 'boolean' },
    disabled: { type: 'boolean' },
    value: { type: 'string' },
    id: { type: 'string' },
    name: { type: 'string' },
    handler: { control: false },
  },
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default',
  checked: false,
  value: 'default-checkbox',
  small: false,
  disabled: false,
  handler() {},
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: 'Disabled',
  checked: false,
  value: 'disabled-checkbox',
  small: false,
  disabled: true,
  handler() {},
};

export const Small = Template.bind({});

Small.args = {
  children: 'Small',
  checked: false,
  value: 'small-checkbox',
  small: true,
  disabled: false,
  handler() {},
};
