import React from 'react';
import { Hint } from '../index';

export default {
  title: 'Hackney Design System/Hint',
  component: Hint,
  argTypes: {
    text: 'string',
  },
};

const Template = (args) => <Hint {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'Default hint text',
};
