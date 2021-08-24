import React, { useState, useEffect } from 'react';
import Input from '.';

// State
// const [inputValues, setInputValues] = useState({ default: 'null', hinted: 'null', error: 'null' });

// Handlers

export default {
  title: 'Hackney Design System/Input',
  component: Input,
  argTypes: {
    children: {},
    value: { type: 'string' },
    error: { type: 'string' },
    type: {
      options: ['text', 'number'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => {
  const [inputValues, setInputValues] = useState(args.value);
  useEffect(() => {
    setInputValues(args.value);
  }, [args.value]);
  return <Input {...args} value={inputValues} handler={(e) => setInputValues(e)} />;
};

export const Default = Template.bind({});

Default.args = {
  children: <span>Default</span>,
  id: 'default-input',
  name: 'default-input',
  error: false,
  value: 'Initial Value',
};

export const WithHint = Template.bind({});

WithHint.args = {
  children: (
    <>
      <span>Label Example</span>
      <span className="govuk-hint lbh-hint">With hint text</span>
    </>
  ),
  id: 'hinted-input',
  name: 'hinted-input',
  error: false,
  value: 'Initial Value',
};

export const WithError = Template.bind({});

WithError.args = {
  children: (
    <>
      <span>Error Example</span>
      <span className="govuk-hint lbh-hint">With hint text</span>
    </>
  ),
  error: 'Error text',
  id: 'error-input',
  name: 'error-input',
  value: 'Initial Value',
};