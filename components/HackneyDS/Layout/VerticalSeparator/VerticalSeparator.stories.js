import React from 'react';
import { VerticalSeparator } from './index';

export default {
  title: 'Hackney Design System/Layout/VerticalSeparator',
  component: VerticalSeparator,
  argTypes: {
    width: {},
  },
};

const Template = (args) => (
  <span style={{ display: 'flex' }}>
    The VerticalSeparator
    <VerticalSeparator {...args} />
    Creates space between elements
  </span>
);

export const Default = Template.bind({});
Default.args = {
  width: '40px',
};
