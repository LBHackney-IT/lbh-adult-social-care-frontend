import React from 'react';
import { Input } from '../index';

export default {
  title: 'Hackney Design System/Input',
  component: Input,
  argTypes: {},
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '',
  type: 'text',
  hint: '',
  error: '',
};

export const Label = Template.bind({});
Label.args = {
  label: 'Label Example',
  type: 'text',
  hint: '',
  error: '',
};

export const HintText = Template.bind({});
HintText.args = {
  label: 'Hint Text Example',
  type: 'text',
  hint: 'Hint text goes here',
  error: '',
};

export const ErrorText = Template.bind({});
ErrorText.args = {
  label: 'Error Example',
  type: 'text',
  hint: '',
  error: 'Error text goes here',
};

export const Everything = Template.bind({});
Everything.args = {
  label: 'The quick brown fox',
  type: 'text',
  hint: 'jumped over the',
  error: 'lazy dog',
};
