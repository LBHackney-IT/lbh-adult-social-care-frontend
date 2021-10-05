import React from 'react';
import FundedNursingCare from './index';

export default {
  title: 'Pages/Brokerage/FundedNursingCare',
  component: FundedNursingCare,
  argTypes: {
    controls: null,
  },
};

const Template = (args) => <FundedNursingCare {...args} />;

export const Default = Template.bind({});
Default.args = {
  collectedByOptions: [
    { text: 'By Net', value: 'net' },
    { text: 'By Gross', value: 'gross' },
  ]
};
