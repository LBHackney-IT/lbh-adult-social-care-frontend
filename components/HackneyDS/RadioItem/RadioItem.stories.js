import React from 'react';
import RadioItem from './index';

export default {
  title: 'Hackney Design System/RadioItem',
  component: RadioItem,
  argTypes: {},
};

const Template = (args) => <RadioItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Radio Label',
  className: '',
  value: '',
  name: 'radioItem',
  id: 'radioItem',
  checked: false,
  disabled: false,
  labelHeading: '',
  handle: () => {},
  hint: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Radio Label',
  className: '',
  value: '',
  name: 'radioItem',
  id: 'radioItem',
  checked: false,
  disabled: true,
  labelHeading: '',
  handle: () => {},
  hint: '',
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Radio Label',
  className: '',
  value: '',
  name: 'radioItem',
  id: 'radioItem',
  checked: true,
  disabled: false,
  labelHeading: '',
  handle: () => {},
  hint: '',
};

export const Hint = Template.bind({});
Hint.args = {
  label: 'Radio Label',
  className: '',
  value: '',
  name: 'radioItem',
  id: 'radioItem',
  checked: true,
  disabled: false,
  labelHeading: '',
  handle: () => {},
  hint: 'Radio Hint',
};

export const LabelHeading = Template.bind({});
LabelHeading.args = {
  label: 'Label with heading',
  className: '',
  value: '',
  name: 'radioItem',
  id: 'radioItem',
  checked: true,
  disabled: false,
  labelHeading: 'Radio Label heading',
  handle: () => {},
  hint: '',
};
