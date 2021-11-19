import React from 'react';
import { Stat } from './index';

export default {
  title: 'Hackney Design System/Info Text/Stat',
  component: Stat,
  argTypes: {},
};

const Template = (args) => <Stat {...args} />;

export const Default = Template.bind({});
Default.args = {
  stats: [
    { value: 48, caption: 'Cases handled this month' }
  ],
};

export const RowOfTwo = Template.bind({});
RowOfTwo.args = {
  stats: [
    { value: 12, caption: 'Cases awaiting review' },
    { value: 48, caption: 'Cases handled this month' },
  ],
  threeColumn: false,
};

export const RowOfThree = Template.bind({});
RowOfThree.args = {
  threeColumn: true,
  stats: [
    { value: 12, caption: 'Cases awaiting review' },
    { value: 48, caption: 'Cases handled this month' },
    { value: 275, caption: <>Cases handled this month <a href="#" className="lbh-link">62 staff</a></> },
  ]
};
