import React from 'react';
import { Button } from '../index';

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
  children: 'Default button',
  secondary: false,
  disabled: false,
  'add-item': false,
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: 'Secondary button',
  secondary: true,
  disabled: false,
  'add-item': false,
};

export const Disabled = Template.bind({});

Disabled.args = {
  children: 'Button',
  disabled: true,
};

export const AddAnotherItemButton = Template.bind({});

AddAnotherItemButton.args = {
  children: 'Add another item',
  secondary: false,
  disabled: false,
  'add-item': true,
};
