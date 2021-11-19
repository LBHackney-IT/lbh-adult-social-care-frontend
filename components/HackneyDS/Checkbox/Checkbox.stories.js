import React, { useEffect, useState } from 'react';
import Checkbox from '.';

export default {
  title: 'Hackney Design System/Form/Checkbox',
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

const Template = (args) => {
  const [checked, setChecked] = useState(false);

  const onChangeValue = (value) => {
    setChecked(value);
  }

  useEffect(() => {
    setChecked(args.value);
  }, [args.value]);

  return <Checkbox id='stories-checkbox' {...args} value={checked} onChangeValue={onChangeValue} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Default',
  value: false,
  small: false,
  disabled: false,
  handler () {},
};

export const Disabled = Template.bind({});

Disabled.args = {
  label: 'Disabled',
  value: false,
  small: false,
  disabled: true,
  handler () {},
};

export const Small = Template.bind({});

Small.args = {
  label: 'Small',
  value: false,
  small: true,
  disabled: false,
  handler () {},
};
