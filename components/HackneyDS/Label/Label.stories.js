import React from 'react';
import { Label } from '../index';

export default {
  title: 'Hackney Design System/Label',
  component: Label,
  argTypes: {
    text: 'string',
  },
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'Default label text',
};
