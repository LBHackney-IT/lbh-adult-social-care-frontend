import React from 'react';
import { Hint } from '../../index';

export default {
  title: 'Hackney Design System/Hint',
  component: Hint,
  argTypes: {
    children: { type: 'string' },
    className: { type: 'string' },
  },
};

const Template = (args) => <Hint {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Default hint text',
  className: '',
};
