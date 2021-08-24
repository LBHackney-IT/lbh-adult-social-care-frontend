import React, { useState, useEffect } from 'react';
import Radio from '.';

export default {
  title: 'Hackney Design System/Radio',
  component: Radio,
  argTypes: {
    children: {},
    checked: { type: 'boolean' },
    value: { type: 'string' },
    id: { type: 'string' },
    name: { type: 'string' },
    inline: { type: 'boolean' },
    disabled: { type: 'boolean' },
    small: { type: 'boolean' },
    handler: { control: false },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.checked);
  useEffect(() => setValue(args.checked), [args.checked]);
  return (
    <Radio
      {...args}
      checked={value}
      handler={(e) => {
        setValue(e);
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  children: 'Legend',
  checked: false,
  value: 'checked-value',
  id: 'deafult-radio',
  name: 'deafult-radio',
  inline: false,
  disabled: false,
  small: false,
};

export const WithDescription = Template.bind({});

WithDescription.args = {
  children: (
    <>
      <span className="govuk-heading-s govuk-!-margin-bottom-1">Legend</span>
      <span>Legend Description</span>
    </>
  ),
  checked: false,
  value: 'checked-value',
  id: 'description-radio',
  name: 'description-radio',
  inline: false,
  disabled: false,
  small: false,
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: 'Disabled radio',
  checked: false,
  value: 'checked-value',
  id: 'disabled-radio',
  name: 'disabled-radio',
  inline: false,
  disabled: true,
  small: false,
};

export const Small = Template.bind({});

Small.args = {
  children: 'Radio Small',
  checked: false,
  value: 'checked-value',
  id: 'small-radio',
  name: 'small-radio',
  inline: false,
  disabled: false,
  small: true,
};
