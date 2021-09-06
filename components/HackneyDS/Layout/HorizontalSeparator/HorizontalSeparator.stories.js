import React from 'react';
import { HorizontalSeparator } from './index';

export default {
  title: 'Hackney Design System/Layout/HorizontalSeparator',
  component: HorizontalSeparator,
  argTypes: {
    height: {}
  },
};

const Template = (args) => (
  <>
    <h2>The HorizontalSeparator</h2>
    <HorizontalSeparator {...args} />
    <h2>Creates space between elements</h2>
  </>
);

export const Default = Template.bind({});
Default.args = {
  height: '40px'
};
