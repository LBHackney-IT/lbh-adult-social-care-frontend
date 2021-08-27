import React from 'react';
import { Label } from '../index';

export default {
  title: 'Hackney Design System/Label',
  component: Label,
  argTypes: {
    text: { type: 'string' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'Default label text',
  className: '',
};
