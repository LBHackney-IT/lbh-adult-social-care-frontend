import React from 'react';
import Label from '.';

export default {
  title: 'Hackney Design System/Label',
  component: Label,
  argTypes: {
    children: { type: 'string' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default label text',
  className: '',
};
