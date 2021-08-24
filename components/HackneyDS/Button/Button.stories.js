import React from 'react';
import { Button } from '../../Button';

export default {
  title: 'Hackney Design System/Button',
  component: Button,
  argTypes: {
    onClick: {
      control: false,
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Button',
  disabled: false,
  linkBtn: false,
};

export const Link = Template.bind({});

Link.args = {
  children: 'Button',
  disabled: false,
  linkBtn: true,
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: 'Button',
  disabled: true,
  linkBtn: false,
};
