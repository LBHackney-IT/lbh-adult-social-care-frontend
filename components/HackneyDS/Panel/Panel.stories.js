import React from 'react';
import { Panel } from './index';

export default {
  title: 'Hackney Design System/Panel',
  component: Panel,
  argTypes: {
    children: { type: 'string' },
  },
};

const Template = (args) => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Panel',
  children: 'This is the panels content',
};
